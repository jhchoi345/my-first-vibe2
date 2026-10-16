// F1 ② 마그넷 보드 (빈 보드) · ⑥ 마그넷이 붙은 보드 — 앱 틀의 "보드" 탭
import { Plus } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { listTrips } from '../lib/trips.js';
import { usePhotoUrl } from '../lib/photos.js';
import { Magnet } from '../Magnet.js';
import { TabLayout, PrimaryButton } from '../ui.js';

function AddSlot() {
  return html`
    <button type="button" aria-label="여행 붙이기" onClick=${() => go('/trip/new')}
      className="flex aspect-[4/5] w-full items-center justify-center self-start rounded-card border-2 border-dashed border-faint text-faint">
      <${Plus} size=${28} />
    </button>`;
}

// 보드 대표 사진 배너 — 가장 최근에 붙인 여행의 대표 사진 (D-036, FLOWS 앱 틀)
function HeroBanner({ trip, onOpen }) {
  const url = usePhotoUrl(trip.picked?.[0]);
  const city = trip.cities[0];
  return html`
    <button type="button" onClick=${onOpen} aria-label=${`${city} 여행 다시 꺼내 보기`}
      className="relative block aspect-[16/10] w-full overflow-hidden rounded-card bg-disabled text-left">
      ${url && html`<img src=${url} alt="" className="absolute inset-0 h-full w-full object-cover" />`}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"></span>
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4 text-on-primary">
        <span className="text-[18px] font-bold leading-[1.4] tracking-[-0.4px]">${city} 여행 잘 다녀왔어요?</span>
        <span className="text-body">그 순간들, 다시 꺼내 볼까요?</span>
      </span>
    </button>`;
}

export function BoardScreen({ justAdded, onSeen }) {
  const trips = listTrips();

  if (!trips.length) {
    return html`
      <${TabLayout} current="/board">
        <h1 className="text-section">내 마그넷 보드</h1>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
          <div aria-hidden="true" className="flex h-[150px] w-[124px] items-center justify-center rounded-card border-2 border-dashed border-faint text-faint">
            <${Plus} size=${32} />
          </div>
          <p className="text-center text-body text-ink">
            아직 마그넷이 없네요.<br />첫 여행을 붙여 볼까요? 지난 여행도 좋아요 🧳
          </p>
        </div>
        <${PrimaryButton} onClick=${() => go('/trip/new')}>여행 붙이기</${PrimaryButton}>
      </${TabLayout}>`;
  }

  // 고르는 중인 여행은 누르면 이어서 고르기, 다 고른 여행은 여행 상세로
  const open = (t) => go(t.status === 'done' ? `/trip/${t.id}` : `/trip/${t.id}/${t.groups?.length ? 'pick' : 'upload'}`);

  const doneCount = trips.filter((t) => t.status === 'done').length;
  const celebrate = justAdded && trips.some((t) => t.id === justAdded);
  const latest = trips.filter((t) => t.status === 'done' && t.picked?.length)
    .sort((a, b) => (b.doneAt || b.createdAt).localeCompare(a.doneAt || a.createdAt))[0];

  return html`
    <${TabLayout} current="/board">
      ${latest && html`<div className="mb-6"><${HeroBanner} trip=${latest} onOpen=${() => { onSeen(); go(`/trip/${latest.id}`); }} /></div>`}
      <h1 className="text-section">내 마그넷 보드</h1>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
        ${trips.map((t, i) => html`<${Magnet} key=${t.id} trip=${t} index=${i} isNew=${t.id === justAdded}
          onClick=${() => { onSeen(); open(t); }} />`)}
        <${AddSlot} />
      </div>
      ${celebrate && html`<p role="status" className="mt-8 text-center text-card-title">
        ${doneCount === 1 ? '완성! 첫 마그넷이 붙었어요' : '완성! 마그넷이 붙었어요'}
      </p>`}
    </${TabLayout}>`;
}
