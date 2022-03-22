import { useMemo, useState, useEffect } from 'react';
import { isBoolean } from '@/utils/is';
import type { BasicTableProps, IPaginationType } from '../tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';

export function usePagination(props: BasicTableProps) {
  const [configRef, setConfigRef] = useState<IPaginationType>({
    ...props.pagination,
  });
  const pagination = useMemo(() => {
    return {
      current: 1,
      pageSize: 10,
      total: 100,
      ...configRef,
    };
  }, [configRef]);

  /** 监听 */
  useDidUpdateEffect(() => {
    setConfigRef({
      ...configRef,
      ...(isBoolean(props.pagination) ? {} : props.pagination),
    });
  }, [props.pagination]);

  /** 直接用函数 方便后面扩展 */
  function setPagination(pagination: IPaginationType) {
    setConfigRef(pagination);
  }

  return {
    pagination,
    setPagination,
  };
}
