import { useEffect, useState } from 'react';
import { html } from './lib/html.js';
import { usePath, go } from './lib/router.js';
import { getAuth } from './lib/auth.js';
import { StartScreen } from './screens/Start.js';
import { BoardScreen } from './screens/Board.js';
import { TripNewScreen } from './screens/TripNew.js';

const EMPTY_DRAFT = { cities: [''], start: '', end: '' };

export function App() {
  const path = usePath();
  const signedIn = !!getAuth();
  // 여행 만들기 입력은 사진 선택을 취소하거나 화면을 오가도 그대로 남긴다
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  // 로그인 전엔 시작 화면만, 로그인 뒤엔 시작 화면 대신 보드로
  useEffect(() => {
    if (!signedIn && path !== '/') go('/', { replace: true });
    if (signedIn && path === '/') go('/board', { replace: true });
  }, [path, signedIn]);

  function onPhotos(trip, files) {
    // 사진 올리기는 조각 3에서
    console.info('사진 선택', trip, files.length);
  }

  if (!signedIn || path === '/') return html`<${StartScreen} />`;
  if (path === '/trip/new') return html`<${TripNewScreen} draft=${draft} setDraft=${setDraft} onPhotos=${onPhotos} />`;
  return html`<${BoardScreen} />`;
}
