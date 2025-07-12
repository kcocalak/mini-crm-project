import { useNavigate } from 'react-router';
import { useUsers } from '../../contenxt/UserContext';
import Table, { type TableColumn, type TableAction } from '../../components/ui/Table/Table';
import Input from '../../components/ui/Input';
import TablePagination from '../../components/ui/Pagination';
import { usePageParams } from '../../contenxt/PageParamsContext';
import { debounce } from '../../constants/helpers';
import { useEffect, useState } from 'react';
import type { User } from '../../constants/types/User';

const UserList = () => {
  const navigate = useNavigate();
  const { users } = useUsers();
  const { pageParams, setPageParams } = usePageParams();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get('search');
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const [userData, setUserData] = useState<User[]>([]);
  const [search, setSearch] = useState(searchValue || '');
  useEffect(() => {
    setPageParams((prev: any) => ({ ...prev, totalCount: Math.ceil(users.length) }));
  }, []);

  const columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'createDate',
      label: 'Creation Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      variant: 'outline',
      onClick: (row) => navigate(`/user/${row.id}`),
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      navigate('/');
    } else {
      const searchQuery = `search=${event.target.value}&`;
      const pageSizeQuery = `pageSize=${pageSize || 10}`;
      const pageQuery = `page=${1}&`;
      navigate(`?${searchQuery}${pageQuery}${pageSizeQuery}`);
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  useEffect(() => {
    if (!searchValue) {
      setUserData(
        users.slice(((page || 1) - 1) * (pageSize || 10), (page || 1) * (pageSize || 10)),
      );
    } else {
      const filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(searchValue?.toLowerCase() || ''),
      );
      setPageParams((prev: any) => ({
        ...prev,
        totalCount: Math.ceil(filteredData.length),
      }));

      setUserData(
        filteredData.slice(((page || 1) - 1) * (pageSize || 10), (page || 1) * (pageSize || 10)),
      );
    }
  }, [searchValue, page, pageSize]);

  useEffect(() => {}, [page, pageSize]);
  return (
    <>
      <Input placeholder="Search" onChange={debouncedHandleSearch} />
      <Table columns={columns} data={userData || []} actions={actions} />
      <TablePagination
        page={page || 1}
        pageSize={pageSize || 10}
        total={pageParams.totalCount}
        onPageChange={(newPage: number) => {
          const searchQuery = searchValue ? `search=${searchValue}&` : '';
          const pageSizeQuery = `pageSize=${pageSize}`;
          const pageQuery = `page=${newPage}&`;
          navigate(`?${searchQuery}${pageQuery}${pageSizeQuery}`);
        }}
        onPageSizeChange={(newPageSize: number) => {
          const searchQuery = searchValue ? `search=${searchValue}&` : '';
          const pageSizeQuery = `pageSize=${newPageSize}`;
          const pageQuery = `page=${1}&`;
          navigate(`?${searchQuery}${pageQuery}${pageSizeQuery}`);
        }}
      />
    </>
  );
};

export default UserList;
