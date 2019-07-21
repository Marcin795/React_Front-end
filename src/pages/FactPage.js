import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Container from "../components/Container";
import { API_URL } from '../App.js';

export default function FactPage({ match }) {

    const [ fact, setFact ] = useState({});

    useLayoutEffect(() => {
        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/visited/`;
                const { data } = await axios.put(url /*+ match.params.uuid*/, {
                    "factUuid": match.params.uuid
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                console.log(data);
                if(data) {
                    setFact(data.fact);
                }

            } catch (e) {
                if(e.response) {
                    console.log(e.response.data.status + ' ' + e.response.data.error + ': ' + e.response.data.message);
                } else {
                    console.log(e.message);
                }
            }
        };

        sendRequest();
    }, [ match.params.uuid ]);

    return (
        <div className={'h-100'}>
            <NavBar/>
            <Container className="d-flex align-items-center h-100">
                <div>
                    { fact ?
                        <div>
                            <h3>{fact.text}</h3>
                        </div> : <></>
                    }
                </div>
            </Container>
        </div>
    );
}