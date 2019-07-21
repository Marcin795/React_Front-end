import React, {useLayoutEffect, useState} from 'react'
import NavBar from "../components/NavBar";
import Container from "../components/Container";
import { API_URL } from '../App.js';

import axios from "axios";
import { Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";

export default function QuizPage() {

    const getNextQuestion = () => {
        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/quiz`;
                const { data } = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if(data) {
                    console.log(data);
                    setQuestion(data);
                } else {
                    setQuestion('redirect');
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

    const submitChoice = () => {
        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/quiz`;
                await axios.post(url, {
                    questionId: question.id,
                    answerId: values.answer
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                const answers = document.getElementsByName('answer');

                answers.forEach(answer => answer.checked = false);

                getNextQuestion();
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

    const [ question, setQuestion ] = useState(null);

    const {values, handleChange, handleSubmit} = useForm(submitChoice, ['answers']);

    useLayoutEffect(() => {
        getNextQuestion();
    }, [setQuestion]);

    if(question === 'redirect') {
        return (
            <Redirect to="/scorePage"/>
        )
    }

    return (
        <div className={'h-100'}>
            <NavBar />
            <Container className="pt-3">
                <ul className="list-group">
                    {question ? (
                        <>
                            <li className="list-group-item">
                                {question.text}
                            </li>

                            <form onSubmit={handleSubmit} >
                                <li className="list-group-item">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="answer"
                                               id="answer1" value={question.answers[0].id} onChange={handleChange} />
                                            <label className="form-check-label w-100" htmlFor="answer1">
                                                {question.answers[0].text}
                                            </label>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="answer"
                                               id="answer2" value={question.answers[1].id} onChange={handleChange} />
                                            <label className="form-check-label w-100" htmlFor="answer2">
                                                {question.answers[1].text}
                                            </label>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="answer"
                                               id="answer3" value={question.answers[2].id} onChange={handleChange} />
                                            <label className="form-check-label w-100" htmlFor="answer3">
                                                {question.answers[2].text}
                                            </label>
                                    </div>
                                </li>
                                <div className="mx-auto text-center">
                                    <button type="submit" className="btn btn-primary">Next</button>
                                </div>
                            </form>
                        </>
                    ) : (
                        ''
                    )}
                </ul>
            </Container>
        </div>

    )
}