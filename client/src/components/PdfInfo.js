import React from "react";
import { Container, Card } from "./styles/PdfInfo.styled";

const PdfInfo = (props) => {
    return (
        <Container>
            {props.docName ? <p>{props.docName}</p> : <p>No name specified</p>}
        </Container>
    );
};

export default PdfInfo;
