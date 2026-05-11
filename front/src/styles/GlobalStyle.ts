import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
  }
`;