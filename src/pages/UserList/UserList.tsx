import { useNavigate, useSearchParams } from 'react-router';
import { useUsers } from '../../contenxt/UserContext';
import Table, { type TableColumn, type TableAction } from '../../components/ui/Table/Table';
import VirtualizedTable, { type Column } from '../../components/ui/Table/VirtualizedTable';
import { CardGrid } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import TablePagination from '../../components/ui/Pagination';
import Badge from '../../components/ui/Badge';
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
  justify-content: space-between;
  margin-bottom: 24px;
  flex-shrink: 0;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchContainer = styled.div`
  min-width: 300px;
`;

const SwitchesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`;

const SwitchLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  white-space: nowrap;
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
  margin-top: 40px;
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
  const showAllUsers = searchParams.get('showAll') === 'true';
  const showCards = searchParams.get('cardView') === 'true';
  const [userData, setUserData] = useState<User[]>([]);
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

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
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
      render: (value: boolean) => <Badge active={value}>{value ? 'Active' : 'Inactive'}</Badge>,
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
      render: (value: boolean) => <Badge active={value}>{value ? 'Active' : 'Inactive'}</Badge>,
    },
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      variant: 'outline',
      onClick: (row) => navigate(`/users/${row.id}`),
    },
  ];

  const virtualizedActions = [
    {
      label: 'View',
      onClick: (row: User) => navigate(`/users/${row.id}`),
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
    
    const updates: Record<string, string | null> = {};
    
    if (!value) {
      updates.search = null;
    } else {
      updates.search = value;
    }
    
    updates.page = '1';
    updateSearchParams(updates);
  };

  const debouncedHandleSearch =  debounce((...args: unknown[]) => {
    handleSearch(args[0] as React.ChangeEvent<HTMLInputElement>);
  }, 300);

  const handleSwitchChange = (checked: boolean) => {
    setIsLoading(true);
    
    startTransition(() => {
      updateSearchParams({ showAll: checked ? 'true' : null });
      
      setTimeout(() => {
        setIsLoading(false);
      }, 150);
    });
  };

  const handleViewSwitchChange = (checked: boolean) => {
    updateSearchParams({ cardView: checked ? 'true' : null });
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
        <LeftControls>
          <SearchContainer>
            <Input 
              placeholder="Search users..." 
              value={inputValue} 
              onChange={(e) => {
                handleInputChange(e);
                debouncedHandleSearch(e);
              }}
            />
          </SearchContainer>
          
          <SwitchesContainer>
            <SwitchGroup>
              <SwitchLabel>Show All</SwitchLabel>
              <Switch
                checked={showAllUsers}
                onChange={handleSwitchChange}
                size="small"
                disabled={isLoading}
              />
            </SwitchGroup>
            
            <SwitchGroup>
              <Switch
                checked={showCards}
                onChange={handleViewSwitchChange}
                size="small"
                leftLabel="Table View"
                rightLabel="Card View"
              />
            </SwitchGroup>
          </SwitchesContainer>
        </LeftControls>
        
        <RightControls>
          <Button variant='primary' onClick={openModal}>
            + Add User
          </Button>
        </RightControls>
      </ControlsContainer>
      
      <AddUserModal open={modalOpen} onClose={closeModal} />
      
      <TableContainer isTransitioning={isPending || isLoading}>
        <LoadingOverlay visible={isLoading}>
          <Spinner />
        </LoadingOverlay>
        
        {showCards ? (
          <>
            <div style={{ 
              height: '700px', 
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <CardGrid 
                data={userData} 
                onViewClick={(user) => navigate(`/users/${user.id}`)}
                emptyMessage="No data found"
              />
            </div>
            {!showAllUsers && (
              <PaginationContainer>
                <TablePagination
                  page={page || 1}
                  pageSize={pageSize || 10}
                  total={pageParams.totalCount}
                  onPageChange={(newPage: number) => {
                    updateSearchParams({ page: newPage.toString() });
                  }}
                  onPageSizeChange={(newPageSize: number) => {
                    updateSearchParams({ 
                      pageSize: newPageSize.toString(),
                      page: '1'
                    });
                  }}
                />
              </PaginationContainer>
            )}
          </>
        ) : showAllUsers ? (
          <div style={{ height: '545px', maxHeight: '700px' }}>
            <VirtualizedTable
              data={userData}
              columns={virtualizedColumns}
              height="100%"
              rowHeight={50}
              actions={virtualizedActions}
              emptyMessage="No data found"
            />
          </div>
        ) : (
          <>
            <Table 
              columns={columns} 
              data={userData || []} 
              actions={actions}
              emptyMessage="No data found"
            />
            <PaginationContainer>
              <TablePagination
                page={page || 1}
                pageSize={pageSize || 10}
                total={pageParams.totalCount}
                onPageChange={(newPage: number) => {
                  updateSearchParams({ page: newPage.toString() });
                }}
                onPageSizeChange={(newPageSize: number) => {
                  updateSearchParams({ 
                    pageSize: newPageSize.toString(),
                    page: '1'
                  });
                }}
              />
            </PaginationContainer>
          </>
        )}
      </TableContainer>
    </PageContainer>
  );
};

export default UserList;
