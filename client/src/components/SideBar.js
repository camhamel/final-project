import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";
import { Container } from "../components/styles/Container.styled";
import { Button } from "../components/styles/Button";
import { MdOutlineHome, MdSearch, MdLogin } from "react-icons/md";
import LogoSrc from "../images/bhhs1.png";

const SideBar = () => {
    // called for navigation
    const navigate = useNavigate();
    const contextData = useAppContext();

    return (
        <Container>
            <Drawer
                sx={{ backgroundColor: "#EAE3D4" }}
                variant="permanent"
                anchor={"left"}
            >
                <LogoBhhs src={LogoSrc} />
                <List sx={{ mt: "50px" }}>
                    <ListItem
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <ListItemButton>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        onClick={() => {
                            navigate("/tools");
                        }}
                    >
                        <ListItemButton>
                            <ListItemText primary={"Tools"} />
                        </ListItemButton>
                    </ListItem>

                    {/* if no user it shows login + signup item, if not it shows nothing */}
                    {!contextData.user ? (
                        <>
                            <ListItem
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                <ListItemButton>
                                    <ListItemText primary={"Log in"} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                <ListItemButton>
                                    <ListItemText primary={"Sign Up"} />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : null}
                    {/* Sign Out Logic*/}
                    <ListItem
                        onClick={() => {
                            localStorage.removeItem("token");
                            contextData.setUser(false);
                            navigate("/login");
                        }}
                    >
                        <ListItemButton>
                            <ListItemText primary={"Sign Out"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Container>
    );
};

export default SideBar;

// const Button = styled.button``;

const LogoBhhs = styled.img`
    width: 175px;
    padding: 0 22px;
`;
