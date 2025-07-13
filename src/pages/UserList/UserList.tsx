import { useNavigate, useSearchParams } from 'react-router';
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  flex-shrink: 0;
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
  flex: 1;
  overflow: hidden;
  position: relative;
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

const PaginationContainer = styled.div`
  flex-shrink: 0;
  margin-top: 16px;
`;

const UserList = () => {
  const navigate = useNavigate();
  const { users } = useUsers();
  const { pageParams, setPageParams } = usePageParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search');
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const modalOpen = searchParams.get('modal') === 'add-user';
  const [userData, setUserData] = useState<User[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(searchValue || '');
  
  useEffect(() => {
    setInputValue(searchValue || '');
  }, [searchValue]);
  
  useEffect(() => {
    setPageParams((prev: { page: number; pageSize: number; totalCount: number }) => ({ 
      ...prev, 
      totalCount: Math.ceil(users.length) 
    }));
  }, [setPageParams, users.length]);

  const openModal = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('modal', 'add-user');
    setSearchParams(newSearchParams);
  };

  const closeModal = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('modal');
    setSearchParams(newSearchParams);
  };

  const columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'createDate',
      label: 'Creation Date',
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'active',
      label: 'Active',
      render: (value: boolean) => value ? 'Yes' : 'No',
    },
  ];

  const virtualizedColumns: Column<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    {
      key: 'createDate',
      header: 'Creation Date',
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'active',
      header: 'Active',
      render: (value: boolean) => value ? 'Yes' : 'No',
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (!value) {
      newSearchParams.delete('search');
    } else {
      newSearchParams.set('search', value);
    }
    
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  const debouncedHandleSearch =  debounce((...args: unknown[]) => {
    handleSearch(args[0] as React.ChangeEvent<HTMLInputElement>);
  }, 300);

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
        setPageParams((prev: { page: number; pageSize: number; totalCount: number }) => ({ ...prev, totalCount: users.length }));
      } else {
        setUserData(
          users.slice(((page || 1) - 1) * (pageSize || 10), (page || 1) * (pageSize || 10)),
        );
        setPageParams((prev: { page: number; pageSize: number; totalCount: number }) => ({ ...prev, totalCount: users.length }));
      }
    } else {
      const filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(searchValue?.toLowerCase() || ''),
      );
      
      if (showAllUsers) {
        setUserData(filteredData);
        setPageParams((prev: { page: number; pageSize: number; totalCount: number }) => ({ ...prev, totalCount: filteredData.length }));
      } else {
        setPageParams((prev: { page: number; pageSize: number; totalCount: number }) => ({
          ...prev,
          totalCount: Math.ceil(filteredData.length),
        }));

        setUserData(
          filteredData.slice(((page || 1) - 1) * (pageSize || 10), (page || 1) * (pageSize || 10)),
        );
      }
    }
  }, [searchValue, page, pageSize, showAllUsers, users, setPageParams]);

  return (
    <PageContainer>
      <ControlsContainer>
        <Button variant='secondary' onClick={openModal}>
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
        
        <Input 
          placeholder="Search" 
          value={inputValue} 
          onChange={(e) => {
            handleInputChange(e);
            debouncedHandleSearch(e);
          }}
        />
      </ControlsContainer>
      
      <AddUserModal open={modalOpen} onClose={closeModal} />
      
      <TableContainer isTransitioning={isPending || isLoading}>
        <LoadingOverlay visible={isLoading}>
          <Spinner />
        </LoadingOverlay>
        
        {showAllUsers ? (
          <VirtualizedTable
            data={userData}
            columns={virtualizedColumns}
            height="100%"
            rowHeight={50}
            actions={virtualizedActions}
          />
        ) : (
          <Table 
            columns={columns} 
            data={userData || []} 
            actions={actions}
          />
        )}
      </TableContainer>
      
      {!showAllUsers && (
        <PaginationContainer>
          <TablePagination
            page={page || 1}
            pageSize={pageSize || 10}
            total={pageParams.totalCount}
            onPageChange={(newPage: number) => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('page', newPage.toString());
              setSearchParams(newSearchParams);
            }}
            onPageSizeChange={(newPageSize: number) => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('pageSize', newPageSize.toString());
              newSearchParams.set('page', '1');
              setSearchParams(newSearchParams);
            }}
          />
        </PaginationContainer>
      )}
    </PageContainer>
  );
};

export default UserList;
