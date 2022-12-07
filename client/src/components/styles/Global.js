import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');

*{
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.header};
}

body{
 background: ${({ theme }) => theme.colors.body};
 color: hsl(192, 100%, 9%);
 font-family: 'Poppins', sans-serif;
 font-size: 1.15em
 
}

p{
  opacity: 0.6;
  line-height: 1.5;
}

input, select {
    border-radius: 2px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 10px;
    background-color: ${({ bg }) => bg || "#fff"};
    color: ${({ color }) => color || "#333"};
    transition: all 0.5s ease 0s;
}
`;

export default GlobalStyles;
