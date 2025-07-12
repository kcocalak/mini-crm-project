import { createContext, useContext, useState } from 'react';
import type { User } from '../constants/types/User';
import { faker } from '@faker-js/faker';

export const UserContext = createContext({
  users: [] as User[],
  setUsers: (_: User[]) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() =>
    Array.from({ length: 5000 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.person.jobTitle(),
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
