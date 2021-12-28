import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body, html {
	background-color: ${({ theme }) => theme.colors.background};
	font-family: ${({ theme }) => theme.font};
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
`;
export default GlobalStyle;
