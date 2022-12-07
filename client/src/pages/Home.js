import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context";
import Avatar from "@mui/material/Avatar";
import { GrAdd } from "react-icons/gr";
import { Flex } from "../components/Flex.styled";
import { FolderItem } from "../components/FolderItem";
import AddFolderModal from "../components/AddFolderModal";
import SearchDocTypeModal from "../components/SearchDocTypeModal";
import { Button } from "../components/styles/Button";

import axios from "axios";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const docs = [
        "None",
        "PP",
        "CP",
        "AM",
        "EA",
        "Bank Approval",
        "CoL",
        "Reports",
        "Taxes",
        "Utilities",
        "DoS",
        "City misc",
        "Septic",
        "Permits",
        "ID",
    ];

    const [docType, setDocType] = useState("None");
    const navigate = useNavigate();
    const contextData = useAppContext();
    const [openModal, setOpenModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [folders, setFolders] = useState([]);
    const [filterFolders, setFilterFolders] = useState([]);
    const [searchName, setSearchName] = useState("");
    const getFolders = async () => {
        const res = await axios.get("/folders", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        setFolders(res.data);
        setFilterFolders(res.data);
        console.log(res.data);
        // data=folders console.log
    };

    useEffect(() => {
        if (!contextData.user) {
            navigate("/login");
        }
        getFolders();
    }, []);

    const handleDocType = (e) => {
        setDocType(e.target.value);
        setOpenSearchModal(true);
        setSearchName("");
    };

    const searchByName = async () => {
        setOpenSearchModal(true);
    };

    return (
        <>
            <HomeContainer>
                <p>Welcome, {contextData.user.firstName}</p>
                <Flex>
                    <div>
                        <div>
                            <h1>Clients</h1>
                        </div>
                        <div>
                            <Button
                                color="white"
                                bg="#552448"
                                onClick={() => setOpenModal(true)}
                            >
                                {/* todo fix sx, align item */}
                                <GrAdd sx={{ fill: "white" }} />
                                Add Client
                            </Button>
                            <AddFolderModal
                                getFolders={getFolders}
                                open={openModal}
                                handleClose={() => setOpenModal(false)}
                            />
                            {/* </Button>
                            <select name="" id="" onChange={handleDocType}>
                                {docs.map((doc) => {
                                    return <option value={doc}>{doc}</option>;
                                })}
                            </select>
                            <input
                                placeholder="search by document name"
                                value={searchName}
                                onChange={(e) => {
                                    setSearchName(e.target.value);
                                }}
                            />
                            <Button onClick={searchByName}>Search</Button>
                       
                            {/* <p>Search by document type:</p> */}
                            {/* <SearchDocTypeModal
                                docType={docType}
                                open={openSearchModal}
                                handleClose={() => setOpenSearchModal(false)}
                                searchName={searchName}
                            /> */}
                        </div>
                    </div>
                </Flex>
                <Flex>
                    {filterFolders.map((folder) => {
                        return (
                            <FolderItem name={folder.name} id={folder._id} />
                        );
                    })}
                </Flex>
            </HomeContainer>
        </>
    );
};

export default Home;

const Body = styled.div``;

const HomeContainer = styled.div`
    margin-top: 50px;
    margin-left: 175px;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    & > div {
        height: 100px;
    }
`;

export const Container = styled.div``;
