// 내 계정 탭 — 기본 장치: 첫 버전엔 로그아웃만 (FLOWS 앱 틀)
import { html } from '../lib/html.js';
import { go } from '../lib/router.js';
import { getAuth, signOut } from '../lib/auth.js';
import { TabLayout, SecondaryButton } from '../ui.js';

const PROVIDER = { kakao: '카카오', google: '구글' };

export function AccountScreen() {
  const provider = PROVIDER[getAuth()?.provider] || '간편';
  return html`
    <${TabLayout} current="/account">
      <h1 className="text-section">내 계정</h1>
      <div className="mt-6 rounded-card bg-surface p-4">
        <p className="text-card-title">${provider}로 로그인했어요</p>
        <p className="mt-1 text-body text-muted">로그아웃해도 이 기기에 모은 마그넷은 그대로 있어요.</p>
        <div className="mt-4">
          <${SecondaryButton} onClick=${() => { signOut(); go('/', { replace: true }); }}>로그아웃</${SecondaryButton}>
        </div>
      </div>
    </${TabLayout}>`;
}
