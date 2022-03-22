import { useState, useEffect, useCallback, useMemo } from 'react';
import { TablePaginationConfig } from 'antd/lib/table';
import type {
  BasicTableProps,
  IPaginationType,
  FetchParams,
} from '../tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';
import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';
import { isFunction, isBoolean } from '@/utils/is';
import { buildUUID } from '@/utils/uuid';
import { get, cloneDeep, merge, mean } from 'lodash-es';
interface ActionType {
  setTableDataRef: Fn;
  setLoading: (loading: boolean) => void;
  setPagination: (pagintaion: IPaginationType) => void;
  clearSelectedRowKeys: () => void;
  paginationRef: IPaginationType;
}

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}

export function useDataSource(
  props: BasicTableProps,
  {
    setTableDataRef,
    setLoading,
    setPagination,
    clearSelectedRowKeys,
    paginationRef,
  }: ActionType,
) {
  const [dataSource, setDataSource] = useState<Recordable[]>([]);
  /** 查询参数设置 */
  const [searchState, setSearchState] = useState<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });
  // 原始数据
  const [rewDataSourceRef, setRawDataSourceRef] = useState<Recordable>({});

  useEffect(() => {
    setTableDataRef([...dataSource]);
  }, [dataSource]);

  /** 自动创建key */
  const getAutoCreateKey = useMemo(() => {
    return props.autoCreateKey && !props.rowKey;
  }, [props.autoCreateKey, props.rowKey]);

  /** 获取ROWKEY字段 */
  const getRowKey = useMemo(() => {
    return getAutoCreateKey ? ROW_KEY : props.rowKey;
  }, [getAutoCreateKey]);

  /** 数组数据 */
  const getDataSourceRef = useMemo(() => {
    if (!dataSource || dataSource.length == 0) {
      return dataSource;
    }
    /** 自动创建key */
    if (getAutoCreateKey) {
      const firstItem = dataSource[0];
      const lastItem = dataSource[dataSource.length - 1];
      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
          const data = cloneDeep(dataSource);
          data.forEach((item) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = buildUUID();
            }
            if (item.children && item.children.length) {
              setTableKey(item.children);
            }
          });
          setDataSource(data);
        }
      }
    }

    return dataSource;
  }, [dataSource]);

  /** 请求数据 */
  async function fetch(opt?: FetchParams) {
    const { api, beforeFetch, searchInfo, defSort, fetchSetting } = props;
    if (!api || !isFunction(api)) return;
    try {
      setLoading(true);
      // 请求结果配置等等
      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting,
      );
      // 请求参数
      let pageParams: Recordable = {};
      const { current = 1, pageSize = PAGE_SIZE } = paginationRef;
      if (isBoolean(paginationRef) && !paginationRef) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.page) || current;
        pageParams[sizeField] = pageSize;
      }

      // 查询参数
      const { sortInfo = {}, filterInfo } = searchState;
      let params: Recordable = merge(
        pageParams,
        searchInfo,
        opt?.searchInfo ?? {},
        defSort,
        sortInfo,
        filterInfo,
        opt?.sortInfo ?? {},
        opt?.filterInfo ?? {},
      );
      // 请求之前处理操作
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params;
      }
      let res = await api(params);
      setRawDataSourceRef(res);
      const isArrayResult = Array.isArray(res);
      /** 拿到分页 和 total */
      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? 0 : get(res, totalField);
      setDataSource(resultItems);
      setPagination({
        ...paginationRef,
        total: resultTotal || 0,
      });
    } catch (error) {
      setDataSource([]);
      setPagination({ total: 0 });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /** 分页切换的时候触发 */
  function handleTableChange(pagination: TablePaginationConfig) {
    const { clearSelectOnPageChange } = props;
    /** 清空选中数据 */
    if (clearSelectOnPageChange) {
      clearSelectedRowKeys();
    }
    setPagination(pagination as IPaginationType);
  }

  /** 设置table key */
  function setTableKey(items: any[]) {
    if (!items || !Array.isArray(items)) return;
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = buildUUID();
      }
      if (item.children && item.children.length) {
        setTableKey(item.children);
      }
    });
  }

  /** 设置表格数据 */
  function setTableData<T = Recordable>(values: T[]) {
    setDataSource(values);
  }

  /** 获取表格数据 */
  function getDataSource<T = Recordable>() {
    return getDataSourceRef as T[];
  }

  /** 获取行数据 */
  function getRawDataSource<T = Recordable>() {
    return rewDataSourceRef as T;
  }

  /** 刷新 */
  async function reload(opt?: FetchParams) {
    return await fetch(opt);
  }

  /** 缓存请求 */
  const fetchWarp = useCallback(fetch, [
    paginationRef.current,
    paginationRef.pageSize,
  ]);

  useEffect(() => {
    fetchWarp();
  }, [fetchWarp]);

  return {
    dataSource: getDataSourceRef,
    handleTableChange,
    getRawDataSource,
    getDataSource,
    setTableData,
    reload,
  };
}
