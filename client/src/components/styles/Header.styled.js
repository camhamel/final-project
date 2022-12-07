import styled from "styled-components";
import React from "react";

export const StyledHeader = styled.header`
    display: flex;
    background-color: ${({ theme }) => theme.colors.header};
    padding: 20px 0;
    width: 100%;
    height: 75px;

    /* h1 {
      color: red;    
    }

    &:hover
    {
      background-color: black;
    } */
`;

export const HeaderPositioning = styled.div`
    display: flex;
    flex-direction: row;
    /* margin-left: 150px; */
    justify-content: center;
    gap: 50px;

    & > div {
        display: flex;
    }
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-bottom: 40px; */
`;

export const Logo = styled.img``;
