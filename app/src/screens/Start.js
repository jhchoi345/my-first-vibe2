// F1 ① 시작 — 무엇을 하는 곳인지 보고, 부담 없이 시작
import { useState } from 'react';
import { WarningCircle } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { signIn } from '../lib/auth.js';
import { go } from '../lib/router.js';
import { Screen, PrimaryButton, SecondaryButton, ErrorRow } from '../ui.js';

// 보드 미리보기 그림 속 마그넷 (그림일 뿐, 사용자 데이터 아님)
const PREVIEW = [
  { city: '오사카', x: '6%', y: '10%', r: -6, tone: 'bg-primary-tint' },
  { city: '제주', x: '38%', y: '20%', r: 4, tone: 'bg-accent-tint' },
  { city: '파리', x: '70%', y: '6%', r: -3, tone: 'bg-canvas' },
  { city: '강릉', x: '20%', y: '54%', r: 5, tone: 'bg-canvas' },
  { city: '방콕', x: '55%', y: '58%', r: -4, tone: 'bg-primary-tint' },
];

function BoardPreview() {
  return html`
    <div aria-hidden="true" className="relative h-[240px] w-full rounded-card bg-surface">
      ${PREVIEW.map((m) => html`
        <div key=${m.city} className="absolute w-[27%] rounded-control bg-surface p-1 pb-1.5 text-center ring-1 ring-disabled"
          style=${{ left: m.x, top: m.y, transform: `rotate(${m.r}deg)` }}>
          <div className=${'aspect-[4/3] w-full rounded-[6px] ' + m.tone}></div>
          <p className="mt-1 text-badge text-ink">${m.city}</p>
        </div>`)}
    </div>`;
}

export function StartScreen() {
  const [pending, setPending] = useState(null);
  const [failed, setFailed] = useState(false);

  async function start(provider) {
    setFailed(false);
    setPending(provider);
    try {
      await signIn(provider);
      go('/board', { replace: true });
    } catch {
      setFailed(true);
      setPending(null);
    }
  }

  return html`
    <${Screen} className="pb-8 pt-10">
      <${BoardPreview} />
      <h1 className="mt-8 text-[26px] font-bold leading-[1.4] tracking-[-0.6px]">
        다녀온 여행의 순간들,<br />여기에 하나씩 모아 볼까요?
      </h1>

      <div className="mt-auto flex flex-col gap-2 pt-10">
        ${failed && html`<${ErrorRow} icon=${html`<${WarningCircle} size=${18} weight="bold" />`}>로그인하지 못했어요. 다시 시도해 볼까요?</${ErrorRow}>`}
        <${PrimaryButton} onClick=${() => start('kakao')} loading=${pending === 'kakao'} disabled=${pending === 'google'}>카카오로 시작하기</${PrimaryButton}>
        <${SecondaryButton} onClick=${() => start('google')} loading=${pending === 'google'} disabled=${pending === 'kakao'}>구글로 시작하기</${SecondaryButton}>
        <p className="mt-1 text-center text-meta text-faint">시작하면 약관·개인정보 처리에 동의하게 돼요</p>
      </div>
    </${Screen}>`;
}
