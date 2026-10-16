// F1 ⑤ 베스트 고르기 — 미리 골라 두지 않음, 묶음마다 자유롭게, 전체 최소 1장 (D-024)
// F6 ③ 다시 고르기도 이 화면: 고른 사진이 체크된 채 열리고, [사진 더 올리기]가 있다
import { useRef, useState } from 'react';
import { ArrowLeft, Check, MapPin, Info, Plus } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { getTrip, updateTrip } from '../lib/trips.js';
import { usePhotoUrl } from '../lib/photos.js';
import { Screen, PrimaryButton, NoticeRow } from '../ui.js';

function PickPhoto({ id, order, onToggle }) {
  const url = usePhotoUrl(id);
  const on = order > 0;
  return html`
    <button type="button" onClick=${onToggle} aria-pressed=${on} aria-label=${on ? '고른 사진' : '사진 고르기'}
      className=${'relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-control bg-disabled ' + (on ? 'ring-[3px] ring-inset ring-primary' : '')}>
      ${url && html`<img src=${url} alt="" className=${'h-full w-full object-cover ' + (on ? 'opacity-90' : '')} />`}
      ${on && html`<span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary">
        <${Check} size=${12} weight="bold" />
      </span>`}
    </button>`;
}

export function PickScreen({ tripId, onDone, onMorePhotos }) {
  const trip = getTrip(tripId);
  const [picked, setPicked] = useState(trip?.picked || []);
  const [skipped] = useState(trip?.skipped || 0);
  const fileRef = useRef(null);
  const editing = trip?.status === 'done'; // F6 ③ 다시 고르기

  if (!trip) return html`<${Screen} className="pt-8"><p className="text-body">여행을 찾지 못했어요.</p></${Screen}>`;

  function toggle(id) {
    const next = picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id];
    setPicked(next);
    updateTrip(tripId, { picked: next, skipped: 0 }); // 고르다 나가도 고른 건 남는다
  }

  return html`
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col">
      <div className="px-5 pt-5">
        <button type="button" aria-label=${editing ? '여행 상세로 돌아가기' : '보드로 나가기'}
          onClick=${() => go(editing ? `/trip/${tripId}` : '/board')}
          className="btn-soft -ml-2 flex h-10 w-10 items-center justify-center rounded-control">
          <${ArrowLeft} size=${22} />
        </button>
        <p className="mt-3 text-[18px] font-bold leading-[1.5] tracking-[-0.4px]">
          같은 곳에서 찍은 사진끼리 모아 뒀어요.<br />마음에 드는 사진을 골라 주세요.
        </p>
        ${editing && html`
          <button type="button" onClick=${() => { fileRef.current.value = ''; fileRef.current.click(); }}
            className="btn-soft mt-3 flex h-10 items-center gap-1.5 rounded-control bg-primary-tint px-3 text-button text-primary-strong">
            <${Plus} size=${16} weight="bold" /> 사진 더 올리기
          </button>
          <input ref=${fileRef} type="file" accept="image/*" multiple className="hidden" data-testid="more-photo-input"
            onChange=${(e) => e.target.files.length && onMorePhotos(tripId, [...e.target.files])} />`}
        ${skipped > 0 && html`<div className="mt-3"><${NoticeRow} icon=${html`<${Info} size=${18} weight="bold" className="shrink-0" />`}>사진만 올렸어요</${NoticeRow}></div>`}
      </div>

      <div className="flex flex-col gap-5 pb-40 pt-5">
        ${trip.groups.map((g) => html`
          <section key=${g.id}>
            <h2 className="flex items-center gap-1 px-5 text-button">
              <${MapPin} size=${16} weight="fill" className="text-primary-strong" />
              ${g.name} <span className="font-normal text-muted">(${g.photoIds.length}장)</span>
            </h2>
            <div className="mt-2 flex gap-1.5 overflow-x-auto px-5 pb-1">
              ${g.photoIds.map((id) => html`<${PickPhoto} key=${id} id=${id} order=${picked.indexOf(id) + 1} onToggle=${() => toggle(id)} />`)}
            </div>
          </section>`)}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[430px] bg-canvas px-5 pb-8 pt-3">
        ${picked.length === 0 && html`<p className="mb-2 text-center text-body text-muted">마음에 드는 사진을 한 장 이상 골라 주세요</p>`}
        <${PrimaryButton} disabled=${picked.length === 0} onClick=${() => onDone(tripId)}>
          다 골랐어요${picked.length ? ` · ${picked.length}장` : ''}
        </${PrimaryButton}>
      </div>
    </div>`;
}
