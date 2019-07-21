import React, { useState, useLayoutEffect } from 'react'
import NavBar from "../components/NavBar";
import Container from "../components/Container";
import {API_URL} from "../App";
import axios from "axios";

export default function VisitedPage() {

    const [visited, setVisited] = useState(0);
    const [toVisit, setToVisit] = useState(0);
    const [facts, setFacts] = useState([]);

    useLayoutEffect(() => {
        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/visited/`;
                const { data } = await axios.get(url /*+ match.params.uuid*/, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                setVisited(data.visitedCount);
                setToVisit(data.toVisitCount);
                setFacts(data.facts);

            } catch (e) {
                if(e.response) {
                    console.log(e.response.data.status + ' ' + e.response.data.error + ': ' + e.response.data.message);
                } else {
                    console.log(e.message);
                }
            }
        };

        sendRequest();
    }, [visited, toVisit]);

    return (
        <div className={'h-100'}>
            <NavBar/>
            <Container className="d-flex justify-content-center align-items-center h-100">
                <div>
                    <div className={'text-center text-warning'}>
                        <h3 className="text-warning display-4 font-weight-bold">Visited:</h3>
                        <h1 className={'display-1 font-weight-bold'}>{`${visited}/${toVisit}`}</h1>
                    </div>
                    <table className={'justify-content-center'}>
                        <tbody>
                            {facts ? facts.map( (fact) => {
                                return (
                                    <tr key={fact.uuid}>
                                        <td><h4>{fact.description}</h4></td>
                                    </tr>
                                )
                            }) : <tr><td>empty</td></tr> }
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}