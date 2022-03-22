import { useState } from 'react';
import type { BasicTableProps } from '../tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';

export function useLoading(props: BasicTableProps) {
  const [loadingRef, setLoadingRef] = useState(props.loading);
  useDidUpdateEffect(() => {
    setLoading(props.loading as boolean);
  }, [props.loading]);

  function setLoading(loading: boolean) {
    setLoadingRef(loading);
  }

  return { loading: loadingRef, setLoading };
}
