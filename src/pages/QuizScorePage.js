import React, { useState } from 'react'
import NavBar from "../components/NavBar";
import Container from "../components/Container";
import { API_URL } from '../App.js';
import axios from "axios";

import useForm from "../hooks/useForm";

export default function QuizScorePage() {

    const getScore = () => {

        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/quiz/${values.email}`;
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

    const [response, setResponse] = useState(null);

    const {values, handleChange, handleSubmit} = useForm(getScore, ['email']);

    return (
        <div className={'h-100'}>
            <NavBar />
            <Container>
                <h4>{response ? `${response.name} ${response.email}` : ''}</h4>
                <h5>{response ? `Score: ${response.score}/${response.choices.length}` : ''}</h5>
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="emailInput">Email</label>
                        <input type="text" className="form-control" id="emailInput" placeholder="Email" name="email" value={values.email} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </Container>
        </div>

    )
}