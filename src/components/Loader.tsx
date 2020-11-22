import React from "react";
import { Container } from "react-bootstrap";

const Loader = () => {
    return <Container className="loader-container"><img className="icon-image" alt="loading..." src={`${process.env.PUBLIC_URL}/loader.gif`} /></Container>
}

export default Loader;