import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyles } from './styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
