import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof import('./theme').colors;
    spacing: (multiplier: number) => string;
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
    };
    typography: typeof import('./theme').typography;
  }
}
