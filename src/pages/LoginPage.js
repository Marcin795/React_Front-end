import React from 'react'
import Container from "../components/Container";
import useForm from "../hooks/useForm";
import axios from 'axios';
import useLogIn from "../hooks/useLogIn";
import NavBar from "../components/NavBar";
import { Redirect } from 'react-router-dom'
import {API_URL} from "../App";

export default function LoginPage(props) {

    const login = () => {
        const sendRequest = async () => {
            try {
                const URL = `http://${API_URL}/api/auth/signin`;
                const {data} = await axios.post(URL, {
                    ...values
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if(data.accessToken) {
                    setToken(data.accessToken);
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

    const { values, handleChange, handleSubmit } = useForm(login, ['email', 'password']);

    const { isLoggedIn, setToken } = useLogIn();

    if(isLoggedIn) {
        const { from } = props.location.state || { from: { pathname: "/"} };
        return <Redirect to={ from.pathname } />;
    }

    return (
        <div className={'h-100'}>
            <NavBar />
            <Container className="d-flex align-items-center justify-content-center text-center h-100">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="Email" name="email" value={values.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <input type="password" className="form-control" id="passwordInput" placeholder="Password" name="password" value={values.password} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </Container>
        </div>
    )
}