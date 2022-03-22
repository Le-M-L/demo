import { useState, useMemo } from 'react';
import { Button } from 'antd';
import { getMemberList } from '@/services/admin/member';
import BasicTable from '@/components/Table';
/** 会员管理 */
const Member = () => {
  // 请求参数
  const [params, setParams] = useState({});
  const [count, setCount] = useState(0);
  const [counts, setCounts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const rowSelection = {
    selectedRowKeys: [1],
  };

  const [columns] = useState([
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => {
        return <a href="">edit</a>;
      },
    },
  ]);
  const [pagination, setPagination] = useState({
    current: 2,
  });
  const [loading, setLoaidng] = useState(true);
  const handleCount = () => {
    setCount(count + 1);
    counts.splice(4, 1);
    setCounts(counts);
  };

  const handleClick = () => {
    setLoaidng(false);
  };

  const handlePage = () => {
    setPagination({
      current: 6,
    });
  };

  return (
    <>
      <span>{count}</span>
      <Button onClick={handleCount}>+1</Button>
      <Button onClick={handleClick}>点击</Button>
      <Button onClick={handlePage}>修改分页</Button>
      <BasicTable
        api={getMemberList}
        loading={loading}
        columns={columns}
        pagination={pagination}
        rowSelection={{}}
        onSelectionChange={(val) => {
          console.log(val);
        }}
      />
    </>
  );
};

export default Member;
