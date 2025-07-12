import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants/theme/theme';
import { GlobalStyles } from './styles';
import { UserProvider } from './contenxt/UserContext';
import { PageParamsProvider } from './contenxt/PageParamsContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <UserProvider>
        <PageParamsProvider>
          <RouterProvider router={router} />
        </PageParamsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
