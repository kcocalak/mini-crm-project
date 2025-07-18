import { createContext, useContext, useState } from 'react';
import type { User } from '../constants/types/User';
import { faker } from '@faker-js/faker';

const roles = [
  'Admin',
  'Manager',
  'User',
  'Guest',
];

export const UserContext = createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}>({
  users: [],
  setUsers: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() =>
    Array.from({ length: 5000 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: roles[Math.floor(Math.random() * roles.length)],
      active: faker.datatype.boolean(),
      createDate: faker.date.past({ years: 1 }),
      location: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
    })),
  );

  const data = {
    users,
    setUsers,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUsers = () => useContext(UserContext);
