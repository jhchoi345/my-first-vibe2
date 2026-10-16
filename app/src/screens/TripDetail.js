// F1 ⑦ 여행 상세 — 위에 작은 경로 지도, 아래 고른 베스트만 3열 그리드 (목표 순간)
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, X } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { getTrip, formatRange } from '../lib/trips.js';
import { usePhotoUrl } from '../lib/photos.js';
import { Screen } from '../ui.js';

// 흉내: 지도 — 지도 모양 그림 위에 사진 위치를 점과 선으로 (SETUP)
function RouteMap({ points }) {
  if (!points.length) {
    return html`<div className="flex h-[150px] items-center justify-center rounded-card bg-surface px-6 text-center text-body text-muted">
      사진에 위치 정보가 없어서 경로는 그리지 못했어요
    </div>`;
  }
  const W = 350, H = 150, PAD = 22;
  const lats = points.map((p) => p.lat), lngs = points.map((p) => p.lng);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const spanLat = maxLat - minLat || 1, spanLng = maxLng - minLng || 1;
  const xy = points.map((p) => [
    points.length === 1 ? W / 2 : PAD + ((p.lng - minLng) / spanLng) * (W - PAD * 2),
    points.length === 1 ? H / 2 : H - PAD - ((p.lat - minLat) / spanLat) * (H - PAD * 2),
  ]);
  return html`
    <div className="relative h-[150px] overflow-hidden rounded-card bg-surface" aria-label="여행 경로 지도">
      <svg viewBox=${`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs><pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="#f4f4f5" strokeWidth="1" /></pattern></defs>
        <rect width=${W} height=${H} fill="url(#grid)" />
        <polyline points=${xy.map((p) => p.join(',')).join(' ')} fill="none" stroke="#8a4fd8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        ${xy.map(([x, y], i) => html`<circle key=${i} cx=${x} cy=${y} r="6" fill="#8a4fd8" stroke="#ffffff" strokeWidth="2" />`)}
      </svg>
    </div>`;
}

function GridPhoto({ id, onOpen }) {
  const url = usePhotoUrl(id);
  return html`<button type="button" onClick=${onOpen} aria-label="사진 크게 보기" className="aspect-square overflow-hidden bg-disabled">
    ${url && html`<img src=${url} alt="" className="h-full w-full object-cover" />`}
  </button>`;
}

function Viewer({ id, place, onClose }) {
  const url = usePhotoUrl(id);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return html`
    <div role="dialog" aria-label="크게 보기" className="fixed inset-0 z-10 flex flex-col bg-ink">
      <div className="mx-auto flex w-full max-w-[430px] justify-end px-3 pt-3">
        <button type="button" aria-label="닫기" onClick=${onClose} className="flex h-10 w-10 items-center justify-center rounded-control text-white">
          <${X} size=${24} />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        ${url && html`<img src=${url} alt="" className="max-h-[75vh] w-full max-w-[430px] object-contain" />`}
      </div>
      ${place && html`<p className="mx-auto flex w-full max-w-[430px] items-center gap-1 px-5 pb-10 text-body text-white">
        <${MapPin} size=${16} weight="fill" /> ${place}
      </p>`}
    </div>`;
}

export function TripDetailScreen({ tripId }) {
  const trip = getTrip(tripId);
  const [open, setOpen] = useState(null);
  if (!trip) return html`<${Screen} className="pt-8"><p className="text-body">여행을 찾지 못했어요.</p></${Screen}>`;

  const byId = Object.fromEntries((trip.photos || []).map((p) => [p.id, p]));
  const placeOf = (id) => trip.groups.find((g) => g.photoIds.includes(id) && g.center)?.name || null;
  // 경로는 찍은 시간 순서대로
  const points = trip.picked.map((id) => byId[id]).filter((p) => p && p.lat != null)
    .sort((a, b) => a.takenAt.localeCompare(b.takenAt));

  return html`
    <div className="mx-auto min-h-[100dvh] w-full max-w-[430px] pb-10">
      <header className="flex items-center gap-2 px-5 pt-5">
        <button type="button" aria-label="보드로 돌아가기" onClick=${() => go('/board')}
          className="btn-soft -ml-2 flex h-10 w-10 items-center justify-center rounded-control">
          <${ArrowLeft} size=${22} />
        </button>
        <h1 className="text-card-title">${trip.cities[0]} · ${formatRange(trip.start, trip.end)}</h1>
      </header>
      <div className="mt-4 px-5"><${RouteMap} points=${points} /></div>
      <div className="mt-4 grid grid-cols-3 gap-0.5">
        ${trip.picked.map((id) => html`<${GridPhoto} key=${id} id=${id} onOpen=${() => setOpen(id)} />`)}
      </div>
      ${open && html`<${Viewer} id=${open} place=${placeOf(open)} onClose=${() => setOpen(null)} />`}
    </div>`;
}
