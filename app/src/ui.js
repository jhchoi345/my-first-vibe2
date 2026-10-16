// 공통 부품 — DESIGN.md components 값 그대로
import { html } from './lib/html.js';

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

// 시스템 오류 줄: error 색 + 아이콘 + 문구, 이모지 없음 (DESIGN Do's)
export function ErrorRow({ children, icon }) {
  return html`<div role="alert" className="flex items-center gap-2 rounded-notice bg-error-tint px-4 py-3 text-body text-error">${icon}${children}</div>`;
}
