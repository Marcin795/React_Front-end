import React, {useLayoutEffect, useState} from 'react'
import NavBar from "../components/NavBar";
import Container from "../components/Container";
import { API_URL } from '../App.js';
import axios from "axios";

import useForm from "../hooks/useForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function QuestionsPage() {

    const getQuestions = () => {

        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/questions`;
                const {data} = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if (data.content) {
                    setQuestions([...data.content]);
                }
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

    const createQuestion = () => {
        const sendRequest = async () => {
            const correct = document.getElementsByName('correctAnswer');
            try {
                const request = {
                    text: values.question,
                    answers: [
                        {
                            text: values.answer1,
                            isCorrect: correct[0].checked
                        },{
                            text: values.answer2,
                            isCorrect: correct[1].checked
                        },{
                            text: values.answer3,
                            isCorrect: correct[2].checked
                        }
                    ]
                };

                console.log(request);
                const url = `http://${API_URL}/api/questions`;
                await axios.post(url, {
                    ...request
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                getQuestions();
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

    const [questions, setQuestions] = useState([]);

    const {values, handleChange, handleSubmit} = useForm(createQuestion, ['question', 'answer1', 'answer2', 'answer3']);

    useLayoutEffect(() => {
        getQuestions();
    }, [questions.length]);

    return (
        <div className={'h-100'}>
            <NavBar />
            <Container>
                <h1>Total: {questions.length}</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Question</th>
                        <th scope="col">Answers</th>
                        <th scope="col">Correct</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions ? questions.map( (question) => {
                        return (
                            <React.Fragment key={question.id}>
                                <tr>
                                    <td rowSpan="3" className="align-middle">{question.text}</td>
                                    <td>{question.answers[0].text}</td>
                                    <td>{question.answers[0].isCorrect ? <FontAwesomeIcon icon={faCheck}/> : ""}</td>
                                </tr>
                                <tr>
                                    <td>{question.answers[1].text}</td>
                                    <td>{question.answers[1].isCorrect ? <FontAwesomeIcon icon={faCheck}/> : ""}</td>
                                </tr>
                                <tr>
                                    <td>{question.answers[2].text}</td>
                                    <td>{question.answers[2].isCorrect ? <FontAwesomeIcon icon={faCheck}/> : ""}</td>
                                </tr>
                            </React.Fragment>
                        )
                    }) : "" }
                    </tbody>
                </table>
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="questionInput">Question</label>
                            <input type="text" className="form-control" id="questionInput" placeholder="Question" name="question" value={values.question} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" aria-label="Radio button for following text input" name="correctAnswer" />
                                </div>
                            </div>
                            <input type="text" className="form-control" id="answer1Input" placeholder="Answer1" name="answer1" value={values.answer1} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" aria-label="Radio button for following text input" name="correctAnswer" />
                                </div>
                            </div>
                            <input type="text" className="form-control" id="answer2Input" placeholder="Answer2" name="answer2" value={values.answer2} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" aria-label="Radio button for following text input" name="correctAnswer" />
                                </div>
                            </div>
                            <input type="text" className="form-control" id="answer3Input" placeholder="Answer3" name="answer3" value={values.answer3} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </Container>
        </div>

    )
}