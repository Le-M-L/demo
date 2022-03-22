import React, {
  useEffect,
  useReducer,
  useCallback,
  useState,
  memo,
} from 'react';
import { Table } from 'antd';
import {
  BasicTableProps,
  paginationInitialType,
  initialStateType,
  actionType,
} from '../Table1/tyoings';
const BasicTable: React.FC<BasicTableProps> = (props) => {
  console.log(11);
  const { api, params, columns, baseProps } = props;
  // 分页数据
  const paginationInitial: paginationInitialType = {
    current: 1,
    pageSize: 10,
    total: 100,
  };

  // table组件全量数据
  const initialState: initialStateType = {
    loading: false,
    pagination: paginationInitial,
    dataSource: [],
  };
  const reducer = (state: initialStateType, action: actionType) => {
    const { payload } = action;
    switch (action.type) {
      case 'TOGGLE_LOADING':
        return { ...state, loading: !state.loading };
      case 'SET_PAGINATION':
        return { ...state, pagination: payload.pagination };
      case 'SET_DATA_SOURCE':
        return { ...state, dataSource: payload.dataSource };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // useCallback包装请求，缓存依赖，优化组件性能
  const fetchDataWarp = useCallback(fetchData, [
    params,
    state.pagination.current,
    api,
  ]);
  // 改变页码
  function handleTableChange(payload: any) {
    if (payload) {
      const { current } = payload;
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          pagination: {
            ...state.pagination,
            current,
          },
        },
      });
    }
  }
  async function fetchData() {
    dispatch({
      type: 'TOGGLE_LOADING',
    });
    const { current, pageSize } = state.pagination;
    let res = await api({ current, pageSize, ...params }).catch((err) => {
      dispatch({ type: 'TOGGLE_LOADING' });
      return {};
    });
    // 关闭loading
    dispatch({
      type: 'TOGGLE_LOADING',
    });
    if (res.success) {
      const { total, data } = res;
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          pagination: { ...state.pagination, total: 100 },
        },
      });
      // 回填数据
      dispatch({
        type: 'SET_DATA_SOURCE',
        payload: {
          dataSource: data,
        },
      });
    }
  }

  useEffect(() => {
    fetchDataWarp();
  }, [fetchDataWarp]);
  return (
    <Table
      pagination={state.pagination}
      onChange={handleTableChange}
      loading={state.loading}
      dataSource={state.dataSource}
      rowKey={(record) => record.id}
      columns={columns}
      {...baseProps}
    />
  );
};

BasicTable.defaultProps = {
  loading: false,
  autoCreateKey: true,
};

export default memo(BasicTable);
