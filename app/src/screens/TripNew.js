// F1 ③ 여행 만들기 — 첫 방문엔 지난 여행만, 도시·날짜만 받는다 (D-023)
import { useRef, useState } from 'react';
import { ArrowLeft, Plus, X, Info } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { today } from '../lib/trips.js';
import { Screen, PrimaryButton, NoticeRow } from '../ui.js';

const fieldClass = 'h-10 w-full rounded-control border border-select-border bg-surface px-3 text-body text-ink placeholder:text-faint';

export function TripNewScreen({ draft, setDraft, onPhotos }) {
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  const { cities, start, end } = draft;

  function setCity(i, value) {
    setDraft({ ...draft, cities: cities.map((c, j) => (j === i ? value : c)) });
  }

  function check() {
    if (!cities.some((c) => c.trim())) return 'city';
    if (!start || !end) return 'date';
    const from = start <= end ? start : end;
    if (from > today()) return 'future';
    return null;
  }

  function openPicker() {
    const problem = check();
    setError(problem);
    if (problem) return;
    fileRef.current.value = '';
    fileRef.current.click(); // 브라우저 사진 선택창 (기본 장치: 별도 권한 없음)
  }

  function onPicked(e) {
    const files = [...e.target.files];
    if (!files.length) return; // 선택을 취소하면 이 화면 그대로, 입력도 그대로
    const [from, to] = start <= end ? [start, end] : [end, start];
    onPhotos({ cities: cities.map((c) => c.trim()).filter(Boolean), start: from, end: to }, files);
  }

  const message = {
    city: '어디로 다녀왔는지 알려 주세요',
    date: '언제 다녀왔는지 알려 주세요',
    future: '아직 안 간 여행은 보드에서 따로 붙일 수 있어요',
  }[error];

  return html`
    <${Screen} className="pb-8 pt-5">
      <header className="flex items-center gap-2">
        <button type="button" aria-label="보드로 돌아가기" onClick=${() => go('/board')}
          className="btn-soft -ml-2 flex h-10 w-10 items-center justify-center rounded-control">
          <${ArrowLeft} size=${22} />
        </button>
        <h1 className="text-card-title">지난 여행 붙이기</h1>
      </header>

      <div className="mt-6 flex flex-col gap-2">
        <label className="text-button text-ink" htmlFor="city-0">어디로 다녀왔어요?</label>
        ${cities.map((c, i) => html`
          <div key=${i} className="flex items-center gap-2">
            <input id=${'city-' + i} className=${fieldClass} value=${c} placeholder="도시 이름 (예: 오사카)"
              onChange=${(e) => { setCity(i, e.target.value); setError(null); }} />
            ${i > 0 && html`
              <button type="button" aria-label="이 도시 빼기" onClick=${() => setDraft({ ...draft, cities: cities.filter((_, j) => j !== i) })}
                className="btn-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-canvas text-muted">
                <${X} size=${18} />
              </button>`}
          </div>`)}
        <button type="button" onClick=${() => setDraft({ ...draft, cities: [...cities, ''] })}
          className="flex items-center gap-1 self-start py-1 text-button text-link">
          <${Plus} size=${16} weight="bold" /> 도시 더하기
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="text-button text-ink">언제 다녀왔어요?</span>
        <div className="flex items-center gap-2">
          <input type="date" aria-label="떠난 날" className=${fieldClass} value=${start} max="9999-12-31"
            onChange=${(e) => { setDraft({ ...draft, start: e.target.value }); setError(null); }} />
          <span className="text-muted">–</span>
          <input type="date" aria-label="돌아온 날" className=${fieldClass} value=${end} max="9999-12-31"
            onChange=${(e) => { setDraft({ ...draft, end: e.target.value }); setError(null); }} />
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-10">
        ${message && html`<${NoticeRow} icon=${html`<${Info} size=${18} weight="bold" className="shrink-0" />`}>${message}</${NoticeRow}>`}
        <${PrimaryButton} onClick=${openPicker}>사진 올리기</${PrimaryButton}>
      </div>
      <input ref=${fileRef} type="file" accept="image/*" multiple className="hidden" onChange=${onPicked} data-testid="photo-input" />
    </${Screen}>`;
}
