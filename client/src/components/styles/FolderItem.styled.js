import styled from "styled-components";
import React from "react";

export const StyledFolder = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 200px;
    cursor: pointer;

    & > p {
        text-align: center;
    }

    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }
`;
