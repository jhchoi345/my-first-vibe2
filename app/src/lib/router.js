// 주소 뒤 #/... 로 화면을 나눈다. 새로고침해도 보던 화면이 그대로 열린다.
import { useEffect, useState } from 'react';

export function currentPath() {
  return location.hash.replace(/^#/, '') || '/';
}

export function go(path, { replace = false } = {}) {
  if (replace) location.replace('#' + path);
  else location.hash = path;
}

export function usePath() {
  const [path, setPath] = useState(currentPath());
  useEffect(() => {
    const onChange = () => setPath(currentPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}
