import { useNavigate } from 'react-router';
import { useUsers } from '../../contenxt/UserContext';
import Table, { type TableColumn, type TableAction } from '../../components/ui/Table/Table';
import VirtualizedTable, { type Column } from '../../components/ui/Table/VirtualizedTable';
import Input from '../../components/ui/Input';
import TablePagination from '../../components/ui/Pagination';
import { usePageParams } from '../../contenxt/PageParamsContext';
import { debounce } from '../../constants/helpers';
import { useEffect, useState, useTransition } from 'react';
import type { User } from '../../constants/types/User';
import { AddUserModal } from '../../components/AddUserModal';
import Button from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch/Switch';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`;

const TableContainer = styled.div<{ isTransitioning: boolean }>`
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ isTransitioning }) => (isTransitioning ? 0.7 : 1)};
  transform: ${({ isTransitioning }) => (isTransitioning ? 'scale(0.98)' : 'scale(1)')};
`;

const LoadingOverlay = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 10;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UserList = () => {
  const navigate = useNavigate();
  const { users } = useUsers();
  const { pageParams, setPageParams } = usePageParams();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get('search');
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const [userData, setUserData] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  
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
    {
      key: 'active',
      label: 'Active',
      render: (value) => value ? 'Yes' : 'No',
    },
  ];

  const virtualizedColumns: Column<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    {
      key: 'createDate',
      header: 'Creation Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'active',
      header: 'Active',
      render: (value) => value ? 'Yes' : 'No',
    },
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      variant: 'outline',
      onClick: (row) => navigate(`/user/${row.id}`),
    },
  ];

  const virtualizedActions = [
    {
      label: 'View',
      onClick: (row: User) => navigate(`/user/${row.id}`),
      variant: 'outline' as const,
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSwitchChange = (checked: boolean) => {
    setIsLoading(true);
    
    startTransition(() => {
      setShowAllUsers(checked);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 150);
    });
  };

  useEffect(() => {
    if (!searchValue) {
      if (showAllUsers) {
        setUserData(users);
        setPageParams((prev: any) => ({ ...prev, totalCount: users.length }));
      } else {
        setUserData(
          users.slice(((page || 1) - 1) * (pageSize || 10), (page || 1) * (pageSize || 10)),
        );
        setPageParams((prev: any) => ({ ...prev, totalCount: users.length }));
      }
    } else {
      const filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(searchValue?.toLowerCase() || ''),
      );
      
      if (showAllUsers) {
        setUserData(filteredData);
        setPageParams((prev: any) => ({ ...prev, totalCount: filteredData.length }));
      } else {
        setPageParams((prev: any) => ({
          ...prev,
          totalCount: Math.ceil(filteredData.length),
        }));

        setUserData(
          filteredData.slice(((page || 1) - 1) * (pageSize || 10), (page || 1) * (pageSize || 10)),
        );
      }
    }
  }, [searchValue, page, pageSize, showAllUsers, users]);

  return (
    <>
      <ControlsContainer>
        <Button variant='secondary' onClick={() => setModalOpen(true)}>
          ➕ Add User
        </Button>
        
        <SwitchContainer>
          <Switch
            checked={showAllUsers}
            onChange={handleSwitchChange}
            label="Show All Users"
            size="medium"
            disabled={isLoading}
          />
        </SwitchContainer>
        
        <Input placeholder="Search" onChange={debouncedHandleSearch} />
      </ControlsContainer>
      
      <AddUserModal open={modalOpen} onClose={() => setModalOpen(false)} />
      
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading}>
          <Spinner />
        </LoadingOverlay>
        
        <TableContainer isTransitioning={isPending || isLoading}>
          {showAllUsers ? (
            <div style={{ height: '700px' }}>
              <VirtualizedTable
                data={userData}
                columns={virtualizedColumns}
                height="100%"
                rowHeight={50}
                actions={virtualizedActions}
              />
            </div>
          ) : (
            <Table 
              columns={columns} 
              data={userData || []} 
              actions={actions}
            />
          )}
        </TableContainer>
      </div>
      
      {!showAllUsers && (
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
      )}
    </>
  );
};

export default UserList;
