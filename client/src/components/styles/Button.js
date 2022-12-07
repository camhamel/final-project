import styled from "styled-components";

export const Button = styled.button`
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

    &:hover {
        opacity: 0.9;
        border-radius: 10px;
        transform: scale(0.5);
        transform: translateY(-1px);
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.header};
        color: ${({ theme }) => theme.colors.header};
        box-shadow: 0px 5px 10px rgba(85, 36, 72, 0.4);
    }
`;
