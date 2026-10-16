// F1 ④ 사진 올리기 — 올라가는 사진 격자 + 진행 막대, 다 되면 장소별로 묶어 베스트 고르기로
import { useEffect, useRef, useState } from 'react';
import { WarningCircle } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { getTrip, updateTrip, formatRange } from '../lib/trips.js';
import { importPhoto, groupPhotos, usePhotoUrl, MAX_PHOTOS } from '../lib/photos.js';
import { Screen, PrimaryButton, ErrorRow } from '../ui.js';

function Thumb({ id }) {
  const url = usePhotoUrl(id);
  return html`<div className="aspect-square overflow-hidden rounded-[4px] bg-disabled">
    ${url && html`<img src=${url} alt="" className="h-full w-full object-cover" />`}
  </div>`;
}

export function UploadScreen({ tripId, files, clearFiles }) {
  const trip = getTrip(tripId);
  const [done, setDone] = useState([]); // 저장된 사진 id
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const fileRef = useRef(null);
  const started = useRef(false);

  async function run(list) {
    setFailed(false);
    const all = [...list];
    const accepted = all.filter((f) => f.type.startsWith('image/')).slice(0, MAX_PHOTOS);
    let skipped = all.length - accepted.length;
    const photos = [...(getTrip(tripId).photos || [])];
    for (let i = 0; i < accepted.length; i++) {
      const p = await importPhoto(accepted[i]);
      if (p) {
        photos.push(p);
        updateTrip(tripId, { photos }); // 올리다 나가도 올라간 사진은 남는다
        setDone((d) => [...d, p.id]);
      } else {
        skipped++;
      }
      setProgress(Math.round(((i + 1) / accepted.length) * 100));
    }
    if (!photos.length) { setFailed(true); return; }
    finish(photos, skipped);
  }

  function finish(photos, skipped = 0) {
    const t = getTrip(tripId);
    updateTrip(tripId, { photos, groups: groupPhotos(photos, t.cities[0]), skipped });
    setTimeout(() => go(`/trip/${tripId}/pick`, { replace: true }), 400);
  }

  useEffect(() => {
    if (!trip || started.current) return;
    started.current = true;
    if (files?.length) {
      const list = files;
      clearFiles();
      run(list);
    } else if (trip.photos?.length) {
      // 올리다 나갔다가 다시 온 경우: 올라간 사진으로 이어서
      setDone(trip.photos.map((p) => p.id));
      setProgress(100);
      finish(trip.photos);
    } else {
      setFailed(true);
    }
  }, []);

  if (!trip) return html`<${Screen} className="pt-8"><p className="text-body">여행을 찾지 못했어요.</p></${Screen}>`;

  return html`
    <${Screen} className="pb-8 pt-6">
      <h1 className="text-card-title">${trip.cities[0]} · ${formatRange(trip.start, trip.end)}</h1>

      <div className="mt-5 grid grid-cols-4 gap-1.5">
        ${done.slice(0, 24).map((id) => html`<${Thumb} key=${id} id=${id} />`)}
        ${!done.length && !failed && [0, 1, 2, 3].map((i) => html`<div key=${i} className="aspect-square animate-pulse rounded-[4px] bg-disabled"></div>`)}
      </div>

      ${failed
        ? html`<div className="mt-auto flex flex-col gap-3 pt-10">
            <${ErrorRow} icon=${html`<${WarningCircle} size=${18} weight="bold" className="shrink-0" />`}>사진을 불러오지 못했어요. 잠시 후 다시 올려 볼까요?</${ErrorRow}>
            <${PrimaryButton} onClick=${() => { fileRef.current.value = ''; fileRef.current.click(); }}>다시 올리기</${PrimaryButton}>
            <input ref=${fileRef} type="file" accept="image/*" multiple className="hidden" data-testid="photo-input"
              onChange=${(e) => e.target.files.length && run(e.target.files)} />
          </div>`
        : html`<div className="mt-auto pb-6 pt-10">
            <div className="h-2 overflow-hidden rounded-full bg-disabled" role="progressbar" aria-valuenow=${progress} aria-valuemin="0" aria-valuemax="100">
              <div className="h-full bg-primary" style=${{ width: progress + '%' }}></div>
            </div>
            <p className="mt-2 text-right text-button">${progress}%</p>
            <p className="mt-3 text-center text-body text-muted">같은 곳에서 찍은 사진끼리 모으는 중이에요</p>
          </div>`}
    </${Screen}>`;
}
