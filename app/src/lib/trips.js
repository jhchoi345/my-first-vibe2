// 여행 목록 — 브라우저에 저장, 새로고침해도 남음 (SETUP 데이터)
const KEY = 'mt.trips';

export function listTrips() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function saveAll(trips) {
  localStorage.setItem(KEY, JSON.stringify(trips));
}

export function getTrip(id) {
  return listTrips().find((t) => t.id === id) || null;
}

export function createTrip({ cities, start, end }) {
  const trip = {
    id: 't' + Date.now().toString(36),
    cities,
    start,
    end,
    status: 'picking', // picking = 고르는 중, done = 마그넷 완성
    photoIds: [],
    groups: [],
    picked: [],
    createdAt: new Date().toISOString(),
  };
  saveAll([...listTrips(), trip]);
  return trip;
}

export function updateTrip(id, patch) {
  const trips = listTrips().map((t) => (t.id === id ? { ...t, ...patch } : t));
  saveAll(trips);
  return trips.find((t) => t.id === id);
}

export function today() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

// "2026.9.12 – 9.15" 꼴
export function formatRange(start, end) {
  const [y1, m1, d1] = start.split('-').map(Number);
  const [y2, m2, d2] = end.split('-').map(Number);
  if (start === end) return `${y1}.${m1}.${d1}`;
  if (y1 !== y2) return `${y1}.${m1}.${d1} – ${y2}.${m2}.${d2}`;
  return `${y1}.${m1}.${d1} – ${m2}.${d2}`;
}
