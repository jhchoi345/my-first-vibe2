// F1 ① 시작 — 무엇을 하는 곳인지 보고, 부담 없이 시작
import { useEffect, useRef, useState } from 'react';
import { WarningCircle } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { signIn } from '../lib/auth.js';
import { go } from '../lib/router.js';
import { Screen, PrimaryButton, SecondaryButton, ErrorRow } from '../ui.js';

// 보드 미리보기 그림 속 마그넷 (예시일 뿐, 사용자 데이터 아님)
// 사진: Unsplash 무료 라이선스 (https://unsplash.com/license), 긴 변 480px로 줄여 app/assets/start/에 둠
const PREVIEW = [
  { city: '강릉', img: 'assets/start/gangneung.jpg' }, // yoo 89 — https://unsplash.com/photos/4wbQ_Tyfoa4
  { city: '오사카', img: 'assets/start/osaka.jpg' }, // Laura Barry — https://unsplash.com/photos/8ZnNLUr3RRc
  { city: '제주', img: 'assets/start/jeju.jpg' }, // WS Chae — https://unsplash.com/photos/-jVX4mW1Uac
  { city: '파리', img: 'assets/start/paris.jpg' }, // Anthony DELANOIX — https://unsplash.com/photos/QAwciFlS1g4
  { city: '방콕', img: 'assets/start/bangkok.jpg' }, // Alejandro Cartagena — https://unsplash.com/photos/qeibBI7w4fQ
];

// 겹쳐 쌓인 카드 → 가운데를 중심으로 휘어진 3D 아치 (21st.dev "Panoramic Spread Hero"를 시작 화면 크기에 맞춤)
// x는 카드 자신의 너비 기준 %, 바깥 카드일수록 뒤로 돌고 작아지고 살짝 내려간다
const CENTER = (PREVIEW.length - 1) / 2;
function cardTransform(i, spread) {
  const o = i - CENTER;
  const a = Math.abs(o);
  return spread
    ? `translate(${o * 60}%, ${a * 7}px) rotateY(${o * -16}deg) rotate(${o * 2}deg) scale(${1 - a * 0.07})`
    : `translate(${o * 3}px, ${o * -3}px) rotateY(0deg) rotate(${o * 3}deg) scale(0.8)`;
}

function BoardPreview() {
  const [spread, setSpread] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  // 화면이 열리면 잠깐 겹쳐 보였다가 펼쳐진다
  useEffect(() => {
    const t = setTimeout(() => setSpread(true), 350);
    return () => clearTimeout(t);
  }, []);

  // 펼쳐진 뒤엔 포인터를 따라 전체가 살짝 기운다 (움직임 줄이기 설정이면 안 함)
  function onMove(e) {
    if (!spread || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = boxRef.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 12 });
  }

  return html`
    <div aria-hidden="true" ref=${boxRef} onPointerMove=${onMove} onPointerLeave=${() => setTilt({ x: 0, y: 0 })}
      className="relative h-[240px] w-full overflow-hidden rounded-card bg-surface" style=${{ perspective: '900px' }}>
      <div className="absolute inset-0 transition-transform duration-500 ease-out"
        style=${{ transformStyle: 'preserve-3d', transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        ${PREVIEW.map((m, i) => html`
          <div key=${m.city} className="absolute left-1/2 top-1/2 w-[29%] -translate-x-1/2 -translate-y-1/2"
            style=${{ zIndex: 10 - Math.round(Math.abs(i - CENTER) * 2), transformStyle: 'preserve-3d' }}>
            <div className="rounded-control bg-surface p-1.5 pb-2 text-center shadow-[0_10px_24px_rgba(24,24,27,0.14)] ring-1 ring-disabled"
              style=${{
                transform: cardTransform(i, spread),
                transition: `transform 1.1s cubic-bezier(.65,0,.35,1) ${Math.abs(i - CENTER) * 60}ms`,
              }}>
              <img src=${m.img} alt="" draggable=${false} className="aspect-[3/4] w-full rounded-[6px] bg-canvas object-cover" />
              <p className="mt-1.5 text-badge text-ink">${m.city}</p>
            </div>
          </div>`)}
      </div>
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
