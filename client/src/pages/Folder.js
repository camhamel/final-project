import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";
import styled from "styled-components";
import { Button } from "../components/styles/Button";
import { UploadButton } from "../components/styles/UploadButton.styled";
import axios from "axios";
import Home from "./Home";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import PdfInfo from "../components/PdfInfo";
import AddDocInfoModal from "../components/AddDocInfoModal";
import { GrAdd } from "react-icons/gr";

const Folder = () => {
    const navigate = useNavigate();
    const contextData = useAppContext();
    const [pdfs, setPdfs] = useState([]);
    const [docType, setDocType] = useState("None");
    const [changePdfId, setChangePdfId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [pdf, setPdf] = useState(null);
    const [pdfName, setPdfName] = useState("");
    const params = useParams();
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

    const getPdfs = async () => {
        const res = await axios.get(`/pdf/${params.folderId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        // data from BE (pdfs)
        console.log(res.data);

        setPdfs(res.data);
    };

    useEffect(() => {
        if (!contextData.user) {
            navigate("/login");
        }
        getPdfs();
    }, []);
    // UPLOAD PDF
    const uploadPdf = async (e) => {
        console.log("here");
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "pdfmanager");
        // uploading pdf to cloudinary (gives a secure_url for the pdf)

        // * start here
        const cloudinary = await axios.post(
            "https://api.cloudinary.com/v1_1/drhi4zyu0/upload",
            data
        );
        console.log(cloudinary.data);
        setPdf(cloudinary.data.secure_url);
    };

    const handleDocType = (e) => {
        setDocType(e.target.value);
    };

    // QR CODE (QRCODE-REACT)
    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `http://localhost:3000/public/folder/${params.folderId}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleOpenModal = (pdfId) => {
        console.log(pdfId);
        setChangePdfId(pdfId);
        setOpenModal(true);
    };

    const submitPdf = async () => {
        if (docType === "None") {
            return alert("Please select a document type.");
        }
        if (pdfName.length === 0) {
            return alert("Please enter a document name.");
        }
        if (!pdf) {
            return alert("Please upload a PDF file.");
        }
        const serverRes = await axios.post(
            "/pdf",
            {
                // cloudinary secure url(stored in pdf state)
                url: pdf,
                folderId: params.folderId,
                type: docType,
                name: pdfName,
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        );
        console.log(serverRes.data);
        // to display pdfs wihtout refreshing
        getPdfs();
    };

    return (
        <FolderContainer>
            <h2></h2>
            <QrContainer>
                <QRCodeCanvas
                    value={`http://localhost:3000/public/folder/${params.folderId}`}
                    id="qr-gen"
                />
                <Button onClick={downloadQRCode}>Download QR</Button>
            </QrContainer>
            <SelectionContainer>
                <select name="" id="" onChange={handleDocType}>
                    {docs.map((doc) => {
                        return <option value={doc}>{doc}</option>;
                    })}
                </select>
                <input
                    onChange={uploadPdf}
                    placeholder="anything"
                    type="file"
                    id="upload-pdf"
                    hidden
                    accept="application/pdf"
                />
                <input
                    placeholder="enter document name"
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value)}
                />
                <UploadButton htmlFor="upload-pdf">Upload PDF</UploadButton>
                <Button onClick={submitPdf}>Submit</Button>

                <br />
            </SelectionContainer>
            {pdfs.map((pdf) => {
                return (
                    <DocumentContainer>
                        <iframeContainer1>
                            <PdfInfo docName={pdf.name} />

                            <Button
                                color="white"
                                bg="#552448"
                                onClick={() => handleOpenModal(pdf._id)}
                            >
                                {/* todo fix sx, align item */}
                                {/* <GrAdd sx={{ fill: "white" }} /> */}
                                Change Document Name
                            </Button>
                            <AddDocInfoModal
                                getPdfs={getPdfs}
                                pdfId={changePdfId}
                                open={openModal}
                                handleClose={() => setOpenModal(false)}
                            />
                        </iframeContainer1>
                        <iframeContainer2>
                            <StyledIframe src={pdf.url}></StyledIframe>
                        </iframeContainer2>
                    </DocumentContainer>
                );
            })}
        </FolderContainer>
    );
};

export default Folder;

const FolderContainer = styled.div`
    /* margin-left: 175px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    /* justify-content: center; */
    /* background-color: grey; */
`;

const QrContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    padding: 15px;
    margin-top: 25px;

    & button {
        width: 126px;
        margin: 15px 0px;
    }
`;

const StyledIframe = styled.iframe`
    margin: 15px;
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
`;

const DocumentContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* margin-top: 100px; */
    /* margin-bottom: 100px; */
    justify-content: center;
    align-items: center;
    /* background-color: blue; */
`;

const SelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    & input,
    select {
        text-align: center;
    }
    /* background-color: red; */
`;

// const iframeContainer2 = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

const iframeContainer1 = styled.div`
    display: flex;
    flex-direction: column;
`;
