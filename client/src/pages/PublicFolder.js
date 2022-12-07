import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../components/styles/Button";
import { UploadButton } from "../components/styles/UploadButton.styled";
import axios from "axios";
import { useParams, Link, json } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import PdfInfo from "../components/PdfInfo";
import AddDocInfoModal from "../components/AddDocInfoModal";
import { GrAdd } from "react-icons/gr";

const PublicFolder = () => {
    const [pdfs, setPdfs] = useState([]);
    const [docType, setDocType] = useState("Choose Doc Type");
    const [changePdfId, setChangePdfId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const params = useParams();
    const docs = [
        "None",
        "Choose Document Type",
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
        getPdfs();
    }, []);

    const uploadPdf = async (e) => {
        if (docType === "none") {
            return alert("Please select a document type.");
        }
        console.log("here");
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "pdfmanager");
        // uploading pdf to cloudinary (gives us a secure_url for the pdf)

        // * start here
        const cloudinary = await axios.post(
            "https://api.cloudinary.com/v1_1/drhi4zyu0/upload",
            data
        );
        console.log(cloudinary.data);
        const serverRes = await axios.post(
            "/pdf",
            {
                // cloudinary secure url
                url: cloudinary.data.secure_url,
                folderId: params.folderId,
                type: docType,
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

    return (
        <FolderContainer>
            <div>
                <QRCodeCanvas
                    value={`http://localhost:3000/public/folder/${params.folderId}`}
                    id="qr-gen"
                />
                <Button onClick={downloadQRCode}>Download QR</Button>
            </div>

            {pdfs.map((pdf) => {
                return (
                    <DocumentContainer>
                        <div>
                            <PdfInfo docName={pdf.name} />
                        </div>
                        <div>
                            <StyledIframe src={pdf.url}></StyledIframe>
                            <a href={pdf.url}>Open PDF</a>
                        </div>
                    </DocumentContainer>
                );
            })}
        </FolderContainer>
    );
};

export default PublicFolder;

const FolderContainer = styled.div`
    margin-left: 175px;
    /* background-color: grey; */
`;

const StyledIframe = styled.iframe`
    width: 30vw;
    height: 40vh;
`;

const DocumentContainer = styled.div`
    display: flex;
    margin-top: 100px;
    margin-bottom: 100px;
    justify-content: center;
    /* align-items: center; */
    /* background-color: blue; */

    & > div {
    }
`;

const SelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
    /* background-color: red; */
`;
