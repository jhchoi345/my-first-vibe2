import { useEffect } from 'react';
import { html } from './lib/html.js';
import { usePath, go } from './lib/router.js';
import { getAuth } from './lib/auth.js';
import { StartScreen } from './screens/Start.js';
import { BoardScreen } from './screens/Board.js';

export function App() {
  const path = usePath();
  const signedIn = !!getAuth();

  // 로그인 전엔 시작 화면만, 로그인 뒤엔 시작 화면 대신 보드로
  useEffect(() => {
    if (!signedIn && path !== '/') go('/', { replace: true });
    if (signedIn && path === '/') go('/board', { replace: true });
  }, [path, signedIn]);

  if (!signedIn || path === '/') return html`<${StartScreen} />`;
  return html`<${BoardScreen} />`;
}
