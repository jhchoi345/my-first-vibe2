// React는 cdnjs의 UMD 파일(window.React)로 불러오고, 여기서 모듈처럼 꺼내 쓴다.
// claude.ai 페이지는 허용된 CDN에서만 스크립트를 받을 수 있어서 이렇게 잇는다.
const React = window.React;
export default React;
export const {
  Children, Component, Fragment, PureComponent, StrictMode, Suspense,
  cloneElement, createContext, createElement, createRef, forwardRef, isValidElement, lazy, memo,
  useCallback, useContext, useDebugValue, useEffect, useId, useImperativeHandle, useLayoutEffect,
  useMemo, useReducer, useRef, useState, useSyncExternalStore, useTransition, useDeferredValue,
} = React;
