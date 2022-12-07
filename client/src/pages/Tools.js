import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { Flex } from "../components/Flex.styled";
import { Button } from "../components/styles/Button";

export const Tools = () => {
    return (
        <ToolsContainer>
            <div>
                <Avatar sx={{ marginTop: "-250px", zIndex: 1 }} />
            </div>

            <Flex>
                <div>
                    <h1>Tools</h1>

                    <hr />
                </div>
            </Flex>
            <Flex>
                <Button>Route Planner</Button>
                <Button>Service Providers</Button>
            </Flex>
        </ToolsContainer>
    );
};

export default Tools;

const ToolsContainer = styled.div`
    margin-top: 50px;
    margin-left: 175px;

    hr {
        background-color: ${({ theme }) => theme.colors.header};
    }
`;

// export const Container = styled.div``;
