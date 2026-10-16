// 흉내: 장소 이름 — 미리 넣어 둔 장소 목록에서 가장 가까운 이름, 없으면 도시 이름 (SETUP)
// 흉내: 국내·해외 마그넷 — 미리 넣어 둔 도시 목록으로 나눔 (SETUP)

export const PLACES = [
  { name: '도톤보리', lat: 34.6687, lng: 135.5013 },
  { name: '오사카성', lat: 34.6873, lng: 135.5262 },
  { name: '우메다', lat: 34.7025, lng: 135.4959 },
  { name: '유니버설 스튜디오', lat: 34.6654, lng: 135.4323 },
  { name: '후시미 이나리', lat: 34.9671, lng: 135.7727 },
  { name: '기요미즈데라', lat: 34.9949, lng: 135.785 },
  { name: '시부야', lat: 35.6595, lng: 139.7005 },
  { name: '아사쿠사', lat: 35.7148, lng: 139.7967 },
  { name: '에펠탑', lat: 48.8584, lng: 2.2945 },
  { name: '루브르 박물관', lat: 48.8606, lng: 2.3376 },
  { name: '왓 아룬', lat: 13.7437, lng: 100.4889 },
  { name: '경복궁', lat: 37.5796, lng: 126.977 },
  { name: '남산타워', lat: 37.5512, lng: 126.9882 },
  { name: '해운대', lat: 35.1587, lng: 129.1604 },
  { name: '감천문화마을', lat: 35.0975, lng: 129.0106 },
  { name: '성산일출봉', lat: 33.4581, lng: 126.9425 },
  { name: '협재해수욕장', lat: 33.394, lng: 126.2397 },
  { name: '안목해변', lat: 37.7717, lng: 128.9476 },
];

const DOMESTIC = ['서울', '부산', '제주', '제주도', '서귀포', '강릉', '경주', '전주', '여수', '속초', '양양', '대구', '인천',
  '광주', '대전', '울산', '통영', '남해', '거제', '가평', '춘천', '포항', '안동', '담양', '순천', '목포', '군산', '단양'];

export function isDomestic(city) {
  const c = city.replace(/\s/g, '').replace(/(특별시|광역시|시|군)$/, '');
  return DOMESTIC.includes(c);
}

// 두 지점 사이 거리(m)
export function distance(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestPlaceName(point) {
  let best = null;
  for (const p of PLACES) {
    const d = distance(point, p);
    if (d < 1500 && (!best || d < best.d)) best = { name: p.name, d };
  }
  return best?.name || null;
}
