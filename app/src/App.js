import { useEffect, useState } from 'react';
import { html } from './lib/html.js';
import { usePath, go } from './lib/router.js';
import { getAuth } from './lib/auth.js';
import { createTrip, getTrip, updateTrip } from './lib/trips.js';
import { StartScreen } from './screens/Start.js';
import { BoardScreen } from './screens/Board.js';
import { TripNewScreen } from './screens/TripNew.js';
import { UploadScreen } from './screens/Upload.js';
import { PickScreen } from './screens/Pick.js';
import { TripDetailScreen } from './screens/TripDetail.js';
import { TripEditScreen } from './screens/TripEdit.js';
import { AccountScreen } from './screens/Account.js';
import { SoonScreen } from './screens/Soon.js';

const EMPTY_DRAFT = { cities: [''], start: '', end: '' };

export function App() {
  const path = usePath();
  const signedIn = !!getAuth();
  // 여행 만들기 입력은 사진 선택을 취소하거나 화면을 오가도 그대로 남긴다
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [pendingFiles, setPendingFiles] = useState(null);
  const [justAdded, setJustAdded] = useState(null); // 방금 붙은 마그넷 (톡! 장면)

  // 로그인 전엔 시작 화면만, 로그인 뒤엔 시작 화면 대신 보드로
  useEffect(() => {
    if (!signedIn && path !== '/') go('/', { replace: true });
    if (signedIn && path === '/') go('/board', { replace: true });
  }, [path, signedIn]);

  function onPhotos(tripInput, files) {
    const trip = createTrip(tripInput);
    setPendingFiles(files);
    setDraft(EMPTY_DRAFT);
    go(`/trip/${trip.id}/upload`, { replace: true });
  }

  function onPicked(tripId) {
    // 다시 고르기(F6 ③)였으면 여행 상세로, 처음 고르기(F1 ⑤)면 마그넷이 붙는 보드로
    if (getTrip(tripId)?.status === 'done') {
      go(`/trip/${tripId}`, { replace: true });
      return;
    }
    updateTrip(tripId, { status: 'done', doneAt: new Date().toISOString() });
    setJustAdded(tripId);
    go('/board', { replace: true });
  }

  // F6 ④ 사진 더 올리기: 기존 여행에 사진을 더해 다시 묶는다
  function onMorePhotos(tripId, files) {
    setPendingFiles(files);
    go(`/trip/${tripId}/upload`, { replace: true });
  }

  if (!signedIn || path === '/') return html`<${StartScreen} />`;
  if (path === '/trip/new') return html`<${TripNewScreen} draft=${draft} setDraft=${setDraft} onPhotos=${onPhotos} />`;

  const m = path.match(/^\/trip\/([^/]+)(?:\/(upload|pick|edit))?$/);
  if (m && m[2] === 'upload') return html`<${UploadScreen} key=${m[1]} tripId=${m[1]} files=${pendingFiles} clearFiles=${() => setPendingFiles(null)} />`;
  if (m && m[2] === 'pick') return html`<${PickScreen} key=${m[1]} tripId=${m[1]} onDone=${onPicked} onMorePhotos=${onMorePhotos} />`;
  if (m && m[2] === 'edit') return html`<${TripEditScreen} key=${m[1]} tripId=${m[1]} />`;
  if (m) return html`<${TripDetailScreen} key=${m[1]} tripId=${m[1]} />`;
  if (path === '/map' || path === '/photos') return html`<${SoonScreen} key=${path} path=${path} />`;
  if (path === '/account') return html`<${AccountScreen} />`;
  return html`<${BoardScreen} justAdded=${justAdded} onSeen=${() => setJustAdded(null)} />`;
}
