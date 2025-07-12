import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-height: calc(100vh - 48px);
  }
    body{
    padding: 24px 40px;
    }

  h1 {
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
    font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
    line-height: ${({ theme }) => theme.typography.h1.lineHeight};
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
    line-height: ${({ theme }) => theme.typography.h2.lineHeight};
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
  }

  h3, h4, h5, h6 {
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    font-size: ${({ theme }) => theme.typography.button.fontSize};
    font-weight: ${({ theme }) => theme.typography.button.fontWeight};
    line-height: ${({ theme }) => theme.typography.button.lineHeight};
    padding: 8px 16px 8px 16px;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    border: none;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid ${({ theme }) => theme.colors.primary.dark};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background-color: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.text.primary};
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  ul {
    padding-left: ${({ theme }) => theme.spacing(3)};
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;
