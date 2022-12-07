import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "./styles/Button";

const AddDocInfoModal = (props) => {
    const [name, setName] = useState("");
    const addDocName = async () => {
        try {
            const res = await axios.patch(
                `/pdf/${props.pdfId}`,
                {
                    name,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            console.log(res.data);
            // close when post is done (folder is created)
            setName("");
            props.handleClose();
            props.getPdfs();
        } catch (err) {
            console.log(err.response.data);
        }
    };
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Add Document Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Document Name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={addDocName} color="white" bg="#552448">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddDocInfoModal;
