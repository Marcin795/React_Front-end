import React, {useLayoutEffect, useState} from 'react'
import NavBar from "../components/NavBar";
import Container from "../components/Container";
import { API_URL } from '../App.js';

import axios from "axios";

export default function ScorePage() {

    const getScore = () => {

        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/quiz/score`;
                const {data} = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if(data) {
                    setResponse(data);
                }
                console.log(data);
            } catch (e) {
                if (e.response) {
                    console.log(e.response.data.status + ' ' + e.response.data.error + ': ' + e.response.data.message);
                } else {
                    console.log(e.message);
                }
            }
        };

        sendRequest();
    };

    const [ response, setResponse ] = useState(null);

    useLayoutEffect(() => {
        getScore();
    }, [setResponse]);

    return (
        <div className={'h-100 d-flex flex-column'}>
            <NavBar />
            <Container className="d-flex flex-column align-items-center justify-content-center text-center h-100">
                <h3 className="text-warning display-4 font-weight-bold">Quiz score:</h3>
                <h1 className="text-warning display-1 font-weight-bold">{response ? (
                    <>
                        {response.score}/{response.choices.length}
                    </>
                ) : (
                    ''
                )}</h1>
            </Container>
        </div>

    )
}