import React, {
  useEffect,
  useReducer,
  useCallback,
  useState,
  memo,
  useMemo,
} from 'react';
import { Table } from 'antd';
import { useLoading } from './hooks/useLoading';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';
import { usePagination } from './hooks/usePagination';
import { useDataSource } from './hooks/useDataSource';
import { useRowSelection } from './hooks/useRowSelection';
import type { BasicTableProps } from './tyoings.d';

const BasicTable: React.FC<BasicTableProps> = (props) => {
  const [tableData, setTableDataRef] = useState([]);
  /** 加载动画设置 */
  const { loading, setLoading } = useLoading(props);
  /** 分页设置 */
  const { pagination, setPagination } = usePagination(props);
  /** 行选择设置 */
  const { clearSelectedRowKeys, getRowSelectionRef } = useRowSelection(
    props,
    tableData,
  );
  /** 数据获取 */
  const { dataSource, handleTableChange } = useDataSource(props, {
    setTableDataRef,
    paginationRef: pagination,
    setLoading,
    setPagination,
    clearSelectedRowKeys,
  });

  return (
    <>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={props.columns}
        pagination={pagination}
        rowSelection={getRowSelectionRef}
        onChange={handleTableChange}
      />
    </>
  );
};

BasicTable.defaultProps = {
  loading: false,
  autoCreateKey: true,
};

/**
 * pre 上一个值
 * cur 当前值
 */
export default memo(
  BasicTable,
  //   ,(pre: BasicTableProps, cur: BasicTableProps) => {
  //   let preState = JSON.stringify(pre);
  //   let curState = JSON.stringify(cur);
  //   console.log(pre)
  //   console.log(cur)
  //   console.log(preState === curState)
  //   if (preState !== curState) return false;
  //   return true;
  // }
);
