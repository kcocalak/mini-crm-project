import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';

import { UserList, UserDetail } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UserList />,
      },
      {
        path: 'user/:userId',
        element: <UserDetail />,
      },
    ],
  },
]);
