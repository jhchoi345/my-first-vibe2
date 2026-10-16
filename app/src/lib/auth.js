// 흉내: 로그인(카카오·구글) — 버튼만 누르면 통과, 로그인 상태가 유지됨 (SETUP)
const KEY = 'mt.auth';

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function signIn(provider) {
  // 진짜 로그인처럼 잠깐 기다렸다가 통과
  return new Promise((resolve) => {
    setTimeout(() => {
      const auth = { provider, signedInAt: new Date().toISOString() };
      localStorage.setItem(KEY, JSON.stringify(auth));
      resolve(auth);
    }, 700);
  });
}

// 기본 장치: 로그아웃 (설정은 첫 버전엔 로그아웃만, FLOWS 기본 장치). 여행과 사진은 이 브라우저에 그대로 남는다
export function signOut() {
  localStorage.removeItem(KEY);
}
