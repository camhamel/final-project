import React, { useState } from "react";
import styled from "styled-components";
import TestData from "../TestData.json";
import { Container } from "../components/styles/Container.styled";
import {
    StyledHeader,
    Nav,
    Logo,
    HeaderPositioning,
} from "../components/styles/Header.styled";
import { Button } from "./styles/Button";
import { Flex } from "../components/Flex.styled";
import AddFolderModal from "../components/AddFolderModal";
import SearchDocTypeModal from "../components/SearchDocTypeModal";
import { useAppContext } from "../context";

function Header() {
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
    const [openModal, setOpenModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [folders, setFolders] = useState([]);
    const [filterFolders, setFilterFolders] = useState([]);
    const [searchName, setSearchName] = useState("");

    const handleDocType = (e) => {
        setDocType(e.target.value);
        setOpenSearchModal(true);
        setSearchName("");
    };

    const searchByName = async () => {
        setOpenSearchModal(true);
    };

    const contextData = useAppContext();

    return (
        <StyledHeader>
            <Container>
                {contextData.user && (
                    <HeaderPositioning>
                        <div>
                            <select name="" id="" onChange={handleDocType}>
                                {docs.map((doc) => {
                                    return <option value={doc}>{doc}</option>;
                                })}
                            </select>
                        </div>
                        <div>
                            <input
                                placeholder="search by document name"
                                value={searchName}
                                onChange={(e) => {
                                    setSearchName(e.target.value);
                                }}
                            />

                            <Button onClick={searchByName}>Search</Button>

                            {/* <p>Search by document type:</p> */}
                            <SearchDocTypeModal
                                docType={docType}
                                open={openSearchModal}
                                handleClose={() => setOpenSearchModal(false)}
                                searchName={searchName}
                            />
                        </div>
                    </HeaderPositioning>
                )}
            </Container>
        </StyledHeader>
    );
}

export default Header;

const HeaderLogo = styled.h1`
    color: #f9f7f7;
`;
