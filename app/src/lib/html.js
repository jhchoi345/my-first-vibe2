// JSX 대신 쓰는 htm: html`<div>...</div>` 꼴로 React 화면을 쓴다 (빌드 도구 없음, SETUP)
import { createElement } from 'react';
import htm from 'htm';

export const html = htm.bind(createElement);
