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
  { city: '런던', img: 'assets/start/london.jpg' }, // enrico bet — https://unsplash.com/photos/MdJq0zFUwrw
  { city: '파리', img: 'assets/start/paris.jpg' }, // Filip Andrejevic — https://unsplash.com/photos/FJYS6vuf39k
  { city: '프라하', img: 'assets/start/prague.jpg' }, // Bianka Magócs — https://unsplash.com/photos/biJhc4IEPpQ
  { city: '오사카', img: 'assets/start/osaka.jpg' }, // Laura Barry — https://unsplash.com/photos/8ZnNLUr3RRc
];

// 겹쳐 쌓인 카드 → 가운데를 중심으로 휘어진 3D 아치 (21st.dev "Panoramic Spread Hero"를 시작 화면 크기에 맞춤)
// 카드마다 스프링으로 펼쳐지고(살짝 지나쳤다 돌아옴), 다 펼쳐진 뒤엔 제각각 천천히 둥실거린다
// 바깥 카드일수록 뒤로 돌고 작아지고 살짝 내려간다
const CENTER = (PREVIEW.length - 1) / 2;
const STACKED = (o) => ({ x: o * 3, y: o * -3, ry: 0, rz: o * 3, s: 0.8 });
const SPREAD = (o, w) => ({ x: o * 0.6 * w, y: Math.abs(o) * 7, ry: o * -16, rz: o * 2, s: 1 - Math.abs(o) * 0.07 });
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

// 스프링 한 칸 진행 (k: 당기는 힘, c: 멈추는 힘)
function step(sp, target, k, c, dt) {
  sp.v += (k * (target - sp.p) - c * sp.v) * dt;
  sp.p += sp.v * dt;
}

// o: 가운데에서 몇 번째, w: 카드 너비(px), p: 펼친 정도, t: 흐른 시간(초), idle: 둥실거림 세기
function cardTransform(o, w, p, t, idle) {
  const a = STACKED(o), b = SPREAD(o, w);
  const ph = (o + CENTER) * 1.7; // 카드마다 다른 박자
  const fy = Math.sin(t * 1.1 + ph) * 4 * idle;
  const fz = Math.sin(t * 0.8 + ph * 0.6) * 1.2 * idle;
  const fry = Math.sin(t * 0.6 + ph * 1.3) * 3 * idle;
  return `translate(${lerp(a.x, b.x, p)}px, ${lerp(a.y, b.y, p) + fy}px) ` +
    `rotateY(${lerp(a.ry, b.ry, p) + fry}deg) rotate(${lerp(a.rz, b.rz, p) + fz}deg) scale(${lerp(a.s, b.s, p)})`;
}

function BoardPreview() {
  const boxRef = useRef(null);
  const sceneRef = useRef(null);
  const cardRefs = useRef([]);
  const pointer = useRef(null);

  // 화면이 열리면 잠깐 겹쳐 보였다가 펼쳐진다. 매 프레임 직접 그려서 화면을 다시 만들지 않는다
  useEffect(() => {
    const cards = cardRefs.current;
    const width = () => cards[0].parentElement.offsetWidth;
    // 움직임 줄이기 설정이면 펼친 모습만 그린다
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((el, i) => { el.style.transform = cardTransform(i - CENTER, width(), 1, 0, 0); });
      return;
    }

    const springs = cards.map(() => ({ p: 0, v: 0 }));
    const tilt = { x: { p: 0, v: 0 }, y: { p: 0, v: 0 } };
    const t0 = performance.now();
    let last = t0;
    let raf;

    function frame(now) {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const t = (now - t0) / 1000;
      const idle = smooth((t - 1.3) / 1.5); // 펼쳐진 뒤 서서히 둥실거림 시작
      const w = width();

      cards.forEach((el, i) => {
        const o = i - CENTER;
        step(springs[i], t > 0.35 + Math.abs(o) * 0.08 ? 1 : 0, 90, 13, dt);
        el.style.transform = cardTransform(o, w, springs[i].p, t, idle);
      });

      // 포인터를 따라 전체가 기울고, 포인터가 없으면 아주 천천히 좌우로 흔들린다
      const tp = pointer.current;
      step(tilt.x, tp ? tp.x : Math.sin(t * 0.45) * 1.5 * idle, 45, 11, dt);
      step(tilt.y, tp ? tp.y : Math.sin(t * 0.3) * 4 * idle, 45, 11, dt);
      sceneRef.current.style.transform = `rotateX(${tilt.x.p}deg) rotateY(${tilt.y.p}deg)`;

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onMove(e) {
    const r = boxRef.current.getBoundingClientRect();
    pointer.current = { x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 14 };
  }

  return html`
    <div aria-hidden="true" ref=${boxRef} onPointerMove=${onMove} onPointerLeave=${() => { pointer.current = null; }}
      className="relative h-[240px] w-full overflow-hidden rounded-card bg-surface" style=${{ perspective: '900px' }}>
      <div ref=${sceneRef} className="absolute inset-0" style=${{ transformStyle: 'preserve-3d' }}>
        ${PREVIEW.map((m, i) => html`
          <div key=${m.city} className="absolute left-1/2 top-1/2 w-[29%] -translate-x-1/2 -translate-y-1/2"
            style=${{ zIndex: 10 - Math.round(Math.abs(i - CENTER) * 2), transformStyle: 'preserve-3d' }}>
            <div ref=${(el) => { cardRefs.current[i] = el; }}
              className="will-change-transform rounded-control bg-surface p-1.5 pb-2 text-center shadow-[0_10px_24px_rgba(24,24,27,0.14)] ring-1 ring-disabled"
              style=${{ transform: cardTransform(i - CENTER, 0, 0, 0, 0) }}>
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
