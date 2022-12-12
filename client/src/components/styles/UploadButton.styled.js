import styled from "styled-components";

export const UploadButton = styled.label`
    border-radius: 2px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    /* width: 15%; */
    font-size: 14px;
    font-weight: 700;
    padding: 10px 10px;
    background-color: ${({ bg }) => bg || "#fff"};
    color: ${({ color }) => color || "#333"};
    transition: all 0.3s ease 0s;
    text-align: center;

    &:hover {
        opacity: 0.9;
        /* transform: scale(0.98); */
        /* transform: translateY(-4px); */
        background-color: ${({ theme }) => theme.colors.header};
        border: 2px solid black;
        color: ${({ theme }) => theme.colors.white};
        box-shadow: 0px 5px 10px rgba(85, 36, 72, 0.4);
    }
`;
