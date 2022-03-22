import React, { useState, useMemo, useEffect } from 'react';
import { ROW_KEY } from '../const';
import type { BasicTableProps, TableRowSelection } from '../tyoings.d';
import { omit } from 'lodash-es';
import { isFunction } from '@/utils/is';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';
import { findNodeAll } from '@/utils/helper/treeHelper';

/** 行选择使用 */
export function useRowSelection(
  props: BasicTableProps,
  tableData: Recordable[],
) {
  /** 选中的行key */
  const [selectedRowKeysRef, setSelectedRowKey] = useState<React.Key[]>([]);
  /** 选中的行数据 */
  const [selectedRow, setSelectedRow] = useState<Recordable[]>([]);

  const getRowSelectionRef = useMemo((): TableRowSelection | undefined => {
    const { rowSelection } = props;
    if (!rowSelection) return;
    return {
      selectedRowKeys: selectedRowKeysRef,
      onChange: (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
      },
      ...omit(rowSelection, ['onChange']),
    };
  }, [props.rowSelection, selectedRowKeysRef, tableData]);

  /** 初始化数据 */
  useDidUpdateEffect(() => {
    setSelectedRowKeys(props.rowSelection?.selectedRowKeys as React.Key[]);
  }, [props.rowSelection?.selectedRowKeys]);

  useDidUpdateEffect(() => {
    const { rowSelection } = props;
    if (rowSelection) {
      const { onChange } = rowSelection;
      if (onChange && isFunction(onChange))
        onChange(getSelectRowKeys(), getSelectRows());
    }

    props.onSelectionChange?.({
      keys: getSelectRowKeys(),
      rows: getSelectRows(),
    });
  }, [selectedRowKeysRef]);

  /** 自动创建key */
  const getAutoCreateKey = useMemo(() => {
    return props.autoCreateKey && !props.rowKey;
  }, [props.autoCreateKey, props.rowKey]);

  /** 获取ROWKEY字段 */
  const getRowKey = useMemo(() => {
    return getAutoCreateKey ? ROW_KEY : props.rowKey;
  }, [getAutoCreateKey]);

  /** 设置行key */
  function setSelectedRowKeys(rowKeys: React.Key[]) {
    setSelectedRowKey(rowKeys);
    /** 获取所有选中 */
    const allSelectedRows = findNodeAll(
      tableData.concat(selectedRow),
      (item) => rowKeys.includes(item[getRowKey as string]),
      {
        children: props.childrenColumnName ?? 'children',
      },
    );

    const trueSelectedRows: any[] = [];
    rowKeys.forEach((key: React.Key) => {
      const found = allSelectedRows.find(
        (item) => item[getRowKey as string] === key,
      );
      found && trueSelectedRows.push(found);
    });
    setSelectedRow(trueSelectedRows);
  }

  /** 设置行数据 */
  function setSelectedRows(rows: Recordable[]) {
    setSelectedRow(rows);
  }

  /** 获取选中的key */
  function getSelectRowKeys() {
    return selectedRowKeysRef;
  }

  /** 获取选中的数据 */
  function getSelectRows() {
    return selectedRow;
  }

  /** 清空选择 */
  function clearSelectedRowKeys() {
    // 清空选中行key
    setSelectedRowKey([]);
    // 清空数据
    setSelectedRow([]);
  }

  /** 根据 key 删除 行 */
  function deleteSelectRowByKey(key: string) {
    setSelectedRowKey(selectedRowKeysRef.filter((item) => item !== key));
  }

  return {
    clearSelectedRowKeys,
    setSelectedRows,
    getRowSelectionRef,
  };
}
