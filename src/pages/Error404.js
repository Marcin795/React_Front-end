import React from 'react'
import Container from "../components/Container";
import {NavLink} from "react-router-dom";

export default function Error404() {
    return (
        <NavLink to={'/'}>
            <Container className="d-flex align-items-center justify-content-center text-center h-100 text-secondary">
                <div>
                    <img src="qrlogo.png" width="90%" alt="" />
                    <h1 className={'display-1 font-weight-bold'}>404</h1>
                    <h2>Nic tu nie ma.</h2>
                </div>
            </Container>
        </NavLink>
    )
}