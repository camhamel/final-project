import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "./styles/Button";

const SearchDocTypeModal = (props) => {
    const [pdfs, setPdfs] = useState([]);

    const getPdfs = async () => {
        console.log(props.docType);
        const res = await axios.get(`/pdf/search/${props.docType}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        // data from BE (pdfs)
        console.log(res.data);

        setPdfs(res.data);
    };

    const getPdfsByName = async () => {
        console.log(props.searchName);
        const res = await axios.get(`/pdf/search/name/${props.searchName}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        // data from BE (pdfs)
        console.log(res.data);

        setPdfs(res.data);
    };

    useEffect(() => {
        props.searchName.length > 0 ? getPdfsByName() : getPdfs();
    }, [props.docType, props.searchName]);
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Search Results</DialogTitle>
                <DialogContent>
                    {pdfs.map((pdf) => {
                        return (
                            <div>
                                <h3>{pdf.name}</h3>
                                <h3>{pdf.type}</h3>
                                <a href={pdf.url} target="_blank">
                                    Open PDF
                                </a>
                            </div>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SearchDocTypeModal;
