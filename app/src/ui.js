// 공통 부품 — DESIGN.md components 값 그대로
import { ArrowLeft, ImagesSquare, Magnet, MapTrifold, UserCircle } from '@phosphor-icons/react';
import { html } from './lib/html.js';
import { go } from './lib/router.js';

// 화면 틀: 모바일 우선, 폰 너비(390px) 기준으로 가운데 정렬
export function Screen({ children, className = '' }) {
  return html`<div className=${'mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-5 ' + className}>${children}</div>`;
}

// primary-button: 화면당 하나뿐인 주요 행동
export function PrimaryButton({ children, onClick, disabled, loading, type = 'button' }) {
  const off = disabled || loading;
  return html`
    <button type=${type} onClick=${onClick} disabled=${off} aria-busy=${loading ? 'true' : undefined}
      className=${'flex h-10 w-full items-center justify-center gap-2 rounded-control px-3 text-button ' +
        (disabled ? 'bg-disabled text-faint' : 'btn-primary bg-primary text-on-primary')}>
      ${loading ? html`<${Spinner} />` : children}
    </button>`;
}

// 흰 바탕 보조 버튼 (select 테두리 색)
export function SecondaryButton({ children, onClick, disabled, loading }) {
  return html`
    <button type="button" onClick=${onClick} disabled=${disabled || loading}
      className="btn-soft flex h-10 w-full items-center justify-center gap-2 rounded-control border border-select-border bg-surface px-3 text-button text-ink">
      ${loading ? html`<${Spinner} dark />` : children}
    </button>`;
}

export function Spinner({ dark }) {
  return html`<span aria-label="불러오는 중" className=${'mt-spin inline-block h-4 w-4 rounded-full border-2 ' +
    (dark ? 'border-disabled border-t-ink' : 'border-white/40 border-t-white')}></span>`;
}

// 앱 틀 (FLOWS "앱 틀") — 위 흰 헤더 바. 탭 화면엔 로고, 안쪽 화면엔 ← 뒤로 + 제목 + 오른쪽 버튼
export function TopBar({ title, onBack, right }) {
  return html`
    <header className="sticky top-0 z-10 border-b border-disabled bg-surface" style=${{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="mx-auto flex h-14 w-full max-w-[430px] items-center gap-2 px-5">
        ${onBack && html`<button type="button" aria-label="뒤로" onClick=${onBack}
          className="btn-soft -ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-control">
          <${ArrowLeft} size=${22} />
        </button>`}
        ${title
          ? html`<h1 className="min-w-0 flex-1 truncate text-card-title">${title}</h1>`
          : html`<p className="flex-1 text-[18px] font-bold tracking-[-0.4px]">모먼트립</p>`}
        ${right}
      </div>
    </header>`;
}

// 안쪽 화면 틀: 위 헤더(← 뒤로 + 제목) + 내용. 탭바는 숨김 — 하던 일에 집중 (FLOWS 앱 틀)
// bare면 내용 좌우 여백을 화면이 직접 정한다(가로로 꽉 차는 그리드·사진 줄)
export function InnerLayout({ title, onBack, right, bare, className = '', children }) {
  return html`
    <div className="flex min-h-[100dvh] flex-col">
      <${TopBar} title=${title} onBack=${onBack} right=${right} />
      <div className=${'mx-auto flex w-full max-w-[430px] flex-1 flex-col ' + (bare ? '' : 'px-5 ') + className}>
        ${children}
      </div>
    </div>`;
}

const TABS = [
  { path: '/board', label: '보드', Icon: Magnet },
  { path: '/map', label: '지도', Icon: MapTrifold },
  { path: '/photos', label: '사진', Icon: ImagesSquare },
  { path: '/account', label: '내 계정', Icon: UserCircle },
];

// 아래 탭바 — 탭 화면에서만. 고른 탭은 주요 색 (DESIGN: 선택 메뉴에 primary)
export function TabBar({ current }) {
  return html`
    <nav aria-label="메뉴" className="fixed inset-x-0 bottom-0 z-10 border-t border-disabled bg-surface"
      style=${{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="mx-auto flex h-16 w-full max-w-[430px]">
        ${TABS.map(({ path, label, Icon }) => {
          const on = current === path;
          return html`<button key=${path} type="button" onClick=${() => go(path)} aria-current=${on ? 'page' : undefined}
            className=${'flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] ' + (on ? 'font-bold text-primary' : 'text-muted')}>
            <${Icon} size=${24} weight=${on ? 'fill' : 'regular'} />${label}
          </button>`;
        })}
      </div>
    </nav>`;
}

// 탭 화면 틀: 위 헤더 + 내용 + 아래 탭바
export function TabLayout({ current, children }) {
  return html`
    <div className="flex min-h-[100dvh] flex-col">
      <${TopBar} />
      <main className="mx-auto flex w-full max-w-[430px] flex-1 flex-col px-5 pt-6"
        style=${{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}>
        ${children}
      </main>
      <${TabBar} current=${current} />
    </div>`;
}

// 아래에서 올라오는 시트 (F6 ② 고치기 메뉴 · ⑥ 지우기 확인). 바깥을 누르면 닫힌다
export function BottomSheet({ children, onClose, label }) {
  return html`
    <div role="dialog" aria-modal="true" aria-label=${label} className="fixed inset-0 z-20 flex flex-col">
      <button type="button" aria-label="닫기" onClick=${onClose} className="flex-1 bg-ink/40"></button>
      <div className="mx-auto w-full max-w-[430px] rounded-t-[18px] bg-surface px-5 pt-4"
        style=${{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
        ${children}
      </div>
    </div>`;
}

// notice-row: 입력 안내처럼 시스템 오류가 아닌 알림 (DESIGN components)
export function NoticeRow({ children, icon }) {
  return html`<div role="alert" className="flex min-h-[56px] items-center gap-2 rounded-notice bg-[#f1f3f5] px-4 py-3 text-body text-[#4b525a]">${icon}${children}</div>`;
}

// 시스템 오류 줄: error 색 + 아이콘 + 문구, 이모지 없음 (DESIGN Do's)
export function ErrorRow({ children, icon }) {
  return html`<div role="alert" className="flex items-center gap-2 rounded-notice bg-error-tint px-4 py-3 text-body text-error">${icon}${children}</div>`;
}
