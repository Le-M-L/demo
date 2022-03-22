import { useEffect, useRef } from 'react';

/** 第一次不加载 */
export function useDidUpdateEffect(fn: () => void, deps?: any[]) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, deps);
}
