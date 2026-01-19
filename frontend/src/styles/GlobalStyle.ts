import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Playfair Display", serif;
    }

    body {
        background-color: #e5e5e5;
    }
`;
