import type { TableRowSelection as ITableRowSelection } from 'antd/lib/table/interface';

export interface PaginationInitialType {
  current: number;
  pageSize: number;
  total: number;
}
export interface FetchParams {
  searchInfo?: Recordable;
  page?: number;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}

export interface InitialStateType {
  loading: boolean;
  pagination: PaginationInitialType;
  dataSource: Recordable[];
}

export interface actionType {
  type: string;
  payload?: any;
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段  支持 a.b.c
  listField: string;
  // 请求结果总数字段  支持 a.b.c
  totalField: string;
}

/** 行选择配置 */
export interface TableRowSelection<T = any> extends ITableRowSelection<T> {
  /**
   * Callback executed when selected rows change
   * @type Function
   */
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => any;
}

/** 表格 */
export interface BasicTableProps {
  loading?: boolean;
  api: (...arg: any[]) => Promise<any>;
  columns: Recordable[];
  autoCreateKey?: boolean; // 自动生成KEY
  rowKey?: string | ((record: Recordable) => string); // 行key
  // 请求之前参数处理函数
  beforeFetch?: Fn;
  fetchSetting?: FetchSetting; // 请求结果配置
  pagination: IPaginationType;
  // 默认的排序参数
  defSort?: Recordable;
  // 额外的请求参数
  searchInfo?: Recordable;
  rowSelection: TableRowSelection;
  clearSelectOnPageChange?: boolean; // 在分页改变时 清空选中值

  onSelectionChange?: Fn;
  childrenColumnName?: string;
}

/** 分页 */
export interface IPaginationType {
  current?: number;
  pageSize?: number;
  total?: number;
}
