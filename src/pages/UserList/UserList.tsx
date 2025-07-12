import { useNavigate } from 'react-router';
import { useUsers } from '../../contenxt/UserContext';
import Table, { type TableColumn, type TableAction } from '../../components/ui/Table/Table';
import Input from '../../components/ui/Input';

const UserList = () => {
  const navigate = useNavigate();
  const { users } = useUsers();

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

  return (
    <div>
      <Input placeholder="Search" />
      <Table
        columns={columns}
        data={users.slice(0, 10)}
        actions={actions}
        emptyMessage="Kullanıcı bulunamadı"
      />
    </div>
  );
};

export default UserList;
