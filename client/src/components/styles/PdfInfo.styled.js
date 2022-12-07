import styled from "styled-components";

export const Container = styled.div`
    padding: 2px 16px;
    border-radius: 4px;
`;

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 4px;

    /* background-size: cover;
    background-position: center;
    background-repeat: no-repeat; */
    & > :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

export const Input = styled.input``;
