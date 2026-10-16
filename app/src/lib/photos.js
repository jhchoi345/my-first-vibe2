// 사진 — 사진 속 위치·찍은 시간은 진짜로 읽고, 줄인 사진을 브라우저 저장 공간(IndexedDB)에 둔다 (SETUP)
import { useEffect, useState } from 'react';
import exifr from 'exifr';
import { get, set } from 'idb-keyval';
import { distance, nearestPlaceName } from './places.js';

export const MAX_PHOTOS = 200;
const MAX_SIDE = 1280;

async function shrink(file) {
  const bitmap = await createImageBitmap(file); // 못 읽는 파일이면 여기서 실패
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob'))), 'image/jpeg', 0.85));
}

async function readMeta(file) {
  try {
    const exif = await exifr.parse(file, { gps: true });
    const has = exif && Number.isFinite(exif.latitude) && Number.isFinite(exif.longitude);
    const taken = exif?.DateTimeOriginal || exif?.CreateDate;
    return {
      lat: has ? exif.latitude : null,
      lng: has ? exif.longitude : null,
      takenAt: taken instanceof Date ? taken.toISOString() : new Date(file.lastModified).toISOString(),
    };
  } catch {
    return { lat: null, lng: null, takenAt: new Date(file.lastModified).toISOString() };
  }
}

// 사진 한 장을 읽어 저장. 사진이 아니거나 못 읽으면 null
export async function importPhoto(file) {
  if (!file.type.startsWith('image/')) return null;
  try {
    const [blob, meta] = await Promise.all([shrink(file), readMeta(file)]);
    const id = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    await set('photo:' + id, { blob, ...meta, name: file.name });
    return { id, ...meta };
  } catch {
    return null;
  }
}

export async function getPhoto(id) {
  return get('photo:' + id);
}

const urlCache = new Map();
export function usePhotoUrl(id) {
  const [url, setUrl] = useState(urlCache.get(id) || null);
  useEffect(() => {
    if (!id || urlCache.has(id)) { setUrl(urlCache.get(id) || null); return; }
    let alive = true;
    getPhoto(id).then((p) => {
      if (!p) return;
      const u = URL.createObjectURL(p.blob);
      urlCache.set(id, u);
      if (alive) setUrl(u);
    });
    return () => { alive = false; };
  }, [id]);
  return url;
}

// 장소·찍은 시간으로 묶기 (D-025). 300m 안이면 같은 장소, 위치 없는 사진은 한 묶음
export function groupPhotos(photos, cityName) {
  const sorted = [...photos].sort((a, b) => a.takenAt.localeCompare(b.takenAt));
  const groups = [];
  const unknown = [];
  for (const p of sorted) {
    if (p.lat == null) { unknown.push(p.id); continue; }
    const near = groups.find((g) => distance(g.center, p) < 300);
    if (near) {
      near.photoIds.push(p.id);
      const n = near.photoIds.length;
      near.center = { lat: near.center.lat + (p.lat - near.center.lat) / n, lng: near.center.lng + (p.lng - near.center.lng) / n };
    } else {
      groups.push({ center: { lat: p.lat, lng: p.lng }, photoIds: [p.id] });
    }
  }
  const used = {};
  const named = groups.map((g, i) => {
    const base = nearestPlaceName(g.center) || cityName;
    used[base] = (used[base] || 0) + 1;
    return { id: 'g' + i, name: base, center: g.center, photoIds: g.photoIds };
  });
  // 같은 이름이 여럿이면 번호를 붙인다
  const seen = {};
  for (const g of named) {
    if (used[g.name] > 1) { seen[g.name] = (seen[g.name] || 0) + 1; g.name = `${g.name} ${seen[g.name]}`; }
  }
  if (unknown.length) named.push({ id: 'g-unknown', name: '장소를 모르는 사진', center: null, photoIds: unknown });
  return named;
}
