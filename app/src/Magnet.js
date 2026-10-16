// 마그넷 — 대표 사진(처음 고른 베스트) + 도시 이름. 그림자 없이 평평하게 (DESIGN Don't)
import { html } from './lib/html.js';
import { usePhotoUrl } from './lib/photos.js';
import { isDomestic } from './lib/places.js';

const TILT = [-4, 3, -2, 5, -5, 2];

export function Magnet({ trip, index = 0, onClick, isNew }) {
  const coverId = trip.picked?.[0] || trip.photos?.[0]?.id;
  const url = usePhotoUrl(coverId);
  const picking = trip.status !== 'done';
  const city = trip.cities[0];
  return html`
    <button type="button" onClick=${onClick} aria-label=${`${city} 마그넷${picking ? ', 고르는 중' : ''}`}
      className=${'relative w-full rounded-card bg-surface p-1.5 pb-2 text-center ring-1 ring-disabled transition-transform ' + (isNew ? 'mt-pop' : '')}
      style=${{ transform: `rotate(${TILT[index % TILT.length]}deg)` }}>
      <div className=${'aspect-[4/5] w-full overflow-hidden rounded-control bg-canvas ' + (picking ? 'opacity-60' : '')}>
        ${url && html`<img src=${url} alt="" className="h-full w-full object-cover" />`}
      </div>
      <p className="mt-1.5 text-card-title">${city}</p>
      <span className="absolute left-3 top-3 rounded-control bg-canvas px-2 text-badge leading-6 text-ink">${picking ? '고르는 중' : isDomestic(city) ? '국내' : '해외'}</span>
    </button>`;
}
