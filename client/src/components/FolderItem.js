import React from "react";
import styled from "styled-components";
// import { Button } from "./styles/Button";
import { useNavigate } from "react-router-dom";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { ClientFolder } from "./styles/Folder.styled";
import { Flex } from "./Flex.styled";
import { StyledFolder } from "./styles/FolderItem.styled";

export const FolderItem = (props) => {
    const navigate = useNavigate();
    return (
        <StyledFolder>
            <FlexFolder onClick={() => navigate(`/folder/${props.id}`)}>
                {/* <FolderContainer> */}
                <FolderSharedIcon
                    sx={{
                        fontSize: "150px",
                    }}
                />
                <p>{props.name}</p>
                {/* </FolderContainer> */}
            </FlexFolder>
        </StyledFolder>
    );
};

const FlexFolder = styled.div`
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
