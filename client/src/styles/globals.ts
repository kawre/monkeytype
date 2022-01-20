import { createGlobalStyle } from "styled-components";

const Globals = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.font};

    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.neutral[50]};
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

export default Globals;
