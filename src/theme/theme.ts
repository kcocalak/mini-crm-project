import type { DefaultTheme } from 'styled-components';
export const colors = {
  primary: {
    main: '#0D3A6B',
    light: '#215080',
    dark: '#062449',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#43B34A',
    light: '#60C268',
    dark: '#2F8A32',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FDFDFD',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#0D3A6B',
    secondary: '#5C5C5C',
    disabled: '#B8B8B8',
  },
  error: {
    main: '#D84343',
    light: '#E57373',
    dark: '#B71C1C',
  },
  warning: {
    main: '#F9A825',
    light: '#FFD54F',
    dark: '#F57F17',
  },
  success: {
    main: '#43B34A',
    light: '#66BB6A',
    dark: '#388E3C',
  },
};

const spacing = (multiplier: number) => `${multiplier * 8}px`;

export const theme: DefaultTheme = {
  colors,
  spacing,
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
  typography: {
    fontFamily:
      "'Alexandria', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeiht: "1.25rem",
    },
  },
};