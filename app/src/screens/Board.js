// F1 ② 마그넷 보드 (빈 보드)
import { Plus } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { Screen, PrimaryButton } from '../ui.js';

export function BoardScreen() {
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

      <${PrimaryButton} onClick=${() => {}}>여행 붙이기</${PrimaryButton}>
    </${Screen}>`;
}
