// F6 ⑤ 여행 정보 고치기 — 여행 만들기 화면에 지금 도시·날짜를 채워서 연다
import { useState } from 'react';
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { getTrip, updateTrip } from '../lib/trips.js';
import { TripNewScreen } from './TripNew.js';
import { Screen } from '../ui.js';

export function TripEditScreen({ tripId }) {
  const trip = getTrip(tripId);
  const [draft, setDraft] = useState(trip ? { cities: [...trip.cities], start: trip.start, end: trip.end } : null);
  if (!trip) return html`<${Screen} className="pt-8"><p className="text-body">여행을 찾지 못했어요.</p></${Screen}>`;

  function onSave(values) {
    updateTrip(tripId, values);
    go(`/trip/${tripId}`, { replace: true });
  }

  return html`<${TripNewScreen} draft=${draft} setDraft=${setDraft} onSave=${onSave}
    title="여행 정보 고치기" backTo=${`/trip/${tripId}`} />`;
}
