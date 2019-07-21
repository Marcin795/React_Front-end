import React from 'react'
import Container from "../components/Container";
import useForm from "../hooks/useForm";
import axios from 'axios';
import useLogIn from "../hooks/useLogIn";
import NavBar from "../components/NavBar";
import {NavLink,/*NavLink,*/ Redirect} from "react-router-dom";
import { API_URL } from '../App.js'

export default function RegisterPage(props) {

    const register = () => {
        if(values.password !== values.repeatPassword) {
            return;
        }
        const sendRequest = async () => {
            try {
                const url = `http://${API_URL}/api/auth/signup`;
                const {data} = await axios.post(url, {
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

    const { values, handleChange, handleSubmit } = useForm(register, ['name', 'email', 'password', 'repeatPassword']);

    const { isLoggedIn, setToken } = useLogIn();

    const { from } = props.location.state || { from: { pathname: "/"} };
    console.log(props);
    console.log( from );
    console.log( from.pathname );
    if(isLoggedIn) {
        return <Redirect to={ from.pathname } />;
    }

    return (
        <div className={'h-100'}>
            <NavBar />
            <Container className="d-flex align-items-center justify-content-center text-center h-100">
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text" className="form-control" id="nameInput" placeholder="Name" name="name" value={values.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="Email" name="email" value={values.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <input type="password" pattern=".{8,}" title="8 znaków" className="form-control" id="passwordInput" placeholder="Password" name="password" value={values.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPasswordInput">Repeat Password</label>
                            <input type="password" className="form-control" id="repeatPasswordInput" placeholder="Repeat Password" name="repeatPassword" value={values.repeatPassword} onChange={handleChange} required />
                        </div>
                        {values.password === values.repeatPassword ? '' : <p className="text-danger">Passwords don't match!</p>}
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <div>
                        <NavLink to={{
                            pathname: "/login",
                            state: { from: from}
                        }}>
                            <h6 className="text-secondary">Already got an account?</h6>
                        </NavLink>
                    </div>
                </div>
            </Container>
        </div>
    )
}