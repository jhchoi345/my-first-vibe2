// F1 ② 마그넷 보드 (빈 보드) · ⑥ 마그넷이 붙은 보드
import { Plus } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { listTrips } from '../lib/trips.js';
import { Magnet } from '../Magnet.js';
import { Screen, PrimaryButton } from '../ui.js';

function AddSlot() {
  return html`
    <button type="button" aria-label="여행 붙이기" onClick=${() => go('/trip/new')}
      className="flex aspect-[4/5] w-full items-center justify-center self-start rounded-card border-2 border-dashed border-faint text-faint">
      <${Plus} size=${28} />
    </button>`;
}

export function BoardScreen({ justAdded, onSeen }) {
  const trips = listTrips();

  if (!trips.length) {
    return html`
      <${Screen} className="pb-8 pt-8">
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
      </${Screen}>`;
  }

  // 고르는 중인 여행은 누르면 이어서 고르기, 다 고른 여행은 여행 상세로
  const open = (t) => go(t.status === 'done' ? `/trip/${t.id}` : `/trip/${t.id}/${t.groups?.length ? 'pick' : 'upload'}`);

  const doneCount = trips.filter((t) => t.status === 'done').length;
  const celebrate = justAdded && trips.some((t) => t.id === justAdded);

  return html`
    <${Screen} className="pb-8 pt-8">
      <h1 className="text-section">내 마그넷 보드</h1>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
        ${trips.map((t, i) => html`<${Magnet} key=${t.id} trip=${t} index=${i} isNew=${t.id === justAdded}
          onClick=${() => { onSeen(); open(t); }} />`)}
        <${AddSlot} />
      </div>
      ${celebrate && html`<p role="status" className="mt-8 text-center text-card-title">
        ${doneCount === 1 ? '완성! 첫 마그넷이 붙었어요' : '완성! 마그넷이 붙었어요'}
      </p>`}
    </${Screen}>`;
}
