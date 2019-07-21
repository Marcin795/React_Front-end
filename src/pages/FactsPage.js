import React, {useLayoutEffect, useState} from 'react'
import qrcode from 'qrcode-generator'
import NavBar from "../components/NavBar";
import Container from "../components/Container";
import { API_URL, APP_URL } from '../App.js';

import axios from "axios";
import {NavLink} from "react-router-dom";
import useForm from "../hooks/useForm";

export default function FactsPage() {

    const generateQR = (cellSize, uuid) => {

        const typeNumber = 8;
        const errorCorrectionLevel = 'H';
        const qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(`http://${APP_URL}/qr/` + uuid);
        qr.make();
        return [ qr.createSvgTag(cellSize, 0), qr.getModuleCount() * cellSize ];
    };

    const listFacts = () => {

        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/facts`;
                const { data } = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if(data.content) {
                    console.log(data);
                    setFacts([...data.content]);
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
    };

    const generateQrWithLogo = (fact, logo) => {
        if(!fact) {
            return;
        }

        const [ svg, size ] = generateQR(4, fact.uuid);
        const image64 = `data:image/svg+xml;base64,${btoa(svg)}`;

        const cv = document.createElement('canvas');
        cv.width = size;
        cv.height = size;
        const cvc = cv.getContext('2d');

        const canvasAsImage = document.getElementById('qr' + fact.id );

        const qr = new Image();
        qr.onload = () => {
            cvc.drawImage(qr, 0, 0);
            cvc.drawImage(logo, size/4, size/4, size/2, size/2);
            canvasAsImage.src = cv.toDataURL('image/png');
        };

        qr.src = image64;
    };

    const createFact = () => {
        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/facts`;
                await axios.post(url, {
                    ...values
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                listFacts();
            } catch (e) {
                if(e.response) {
                    console.log(e.response.data.status + ' ' + e.response.data.error + ': ' + e.response.data.message);
                } else {
                    console.log(e.message);
                }
            }
        };

        sendRequest();
    };

    const [ facts, setFacts ] = useState([]);

    const { values, handleChange, handleSubmit } = useForm(createFact, ['description', 'text']);

    useLayoutEffect(() => {
        listFacts();
    }, [facts.length]);

    useLayoutEffect(() => {
        const logo = new Image();
        logo.onload = () => {
            facts.forEach(fact => {
                generateQrWithLogo(fact, logo);
            })
        };
        logo.src = window.location.origin + '/qrlogo.png';
    });

    return (
        <div className={'h-100'}>
            <NavBar />
            <Container>
                <h1>Total: {facts.length}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Text</th>
                            <th scope="col">QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facts ? facts.map( (fact) => {
                            return (
                                <tr key={fact.id}>
                                    <td>{fact.description}</td>
                                    <td>{fact.text}</td>
                                    <td><NavLink to={`/qr/${fact.uuid}`} ><img id={ 'qr' + fact.id }  alt=""/></NavLink></td>
                                </tr>
                            )
                        }) : <tr><td>empty</td></tr> }
                    </tbody>
                </table>
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="decriptionInput">Description</label>
                            <input type="text" className="form-control" id="descriptionInput" placeholder="Description" name="description" value={values.description} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="textInput">Text</label>
                            <textarea rows="3" className="form-control" id="textInput" placeholder="Text" name="text" value={values.text} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </Container>
        </div>

    )
}