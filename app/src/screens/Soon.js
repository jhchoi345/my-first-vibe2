// 지도·사진 탭 — F5(추억 모아 보기)를 그리기 전까지 "곧 만나요" 안내만 (D-035)
import { MapTrifold, ImagesSquare } from '@phosphor-icons/react';
import { html } from '../lib/html.js';
import { TabLayout } from '../ui.js';

const PAGES = {
  '/map': { title: '여행 지도', Icon: MapTrifold, text: '다녀온 곳을 지도에서 다시 떠나 볼 수 있게 준비하고 있어요' },
  '/photos': { title: '사진 모아 보기', Icon: ImagesSquare, text: '모든 여행의 베스트 사진을 한곳에 모아 볼 수 있게 준비하고 있어요' },
};

export function SoonScreen({ path }) {
  const { title, Icon, text } = PAGES[path];
  return html`
    <${TabLayout} current=${path}>
      <h1 className="text-section">${title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-tint text-primary-strong">
          <${Icon} size=${30} />
        </span>
        <p className="text-card-title">곧 만나요</p>
        <p className="max-w-[260px] text-body text-muted">${text}</p>
      </div>
    </${TabLayout}>`;
}
