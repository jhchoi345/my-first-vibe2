import { useEffect, useState } from 'react';
import { html } from './lib/html.js';
import { usePath, go } from './lib/router.js';
import { getAuth } from './lib/auth.js';
import { createTrip, updateTrip } from './lib/trips.js';
import { StartScreen } from './screens/Start.js';
import { BoardScreen } from './screens/Board.js';
import { TripNewScreen } from './screens/TripNew.js';
import { UploadScreen } from './screens/Upload.js';
import { PickScreen } from './screens/Pick.js';
import { TripDetailScreen } from './screens/TripDetail.js';
import { TripEditScreen } from './screens/TripEdit.js';

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
    updateTrip(tripId, { status: 'done', doneAt: new Date().toISOString() });
    setJustAdded(tripId);
    go('/board', { replace: true });
  }

  if (!signedIn || path === '/') return html`<${StartScreen} />`;
  if (path === '/trip/new') return html`<${TripNewScreen} draft=${draft} setDraft=${setDraft} onPhotos=${onPhotos} />`;

  const m = path.match(/^\/trip\/([^/]+)(?:\/(upload|pick|edit))?$/);
  if (m && m[2] === 'upload') return html`<${UploadScreen} key=${m[1]} tripId=${m[1]} files=${pendingFiles} clearFiles=${() => setPendingFiles(null)} />`;
  if (m && m[2] === 'pick') return html`<${PickScreen} key=${m[1]} tripId=${m[1]} onDone=${onPicked} />`;
  if (m && m[2] === 'edit') return html`<${TripEditScreen} key=${m[1]} tripId=${m[1]} />`;
  if (m) return html`<${TripDetailScreen} key=${m[1]} tripId=${m[1]} />`;
  return html`<${BoardScreen} justAdded=${justAdded} onSeen=${() => setJustAdded(null)} />`;
}
