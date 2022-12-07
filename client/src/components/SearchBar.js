import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
// import { Button } from "../components/styles/Button";

export const SearchBar = () => {
    return (
        <SearchBarContainer>
            <SearchInput type="text" placeholder="Search.." name="search" />
        </SearchBarContainer>
    );
};

export default SearchBar;

const SearchBarContainer = styled.div``;

const SearchInput = styled.input`
    width: 25%;
    border: 1px solid ${({ theme }) => theme.colors.header};
    /* padding: 5px; */
    height: 30px;
    border-radius: 5px;
    /* border-right: none; */
    /* outline: none; */
    color: ${({ theme }) => theme.colors.header};
    margin-left: 25px;
`;

const SearchButton = styled.button``;

//     cursor: pointer;

//     &:hover {
//         background: #ccc;
//     }
// `;
