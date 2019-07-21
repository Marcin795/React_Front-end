import React from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuizPage from "./pages/QuizPage";
import Error404 from './pages/Error404'
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import FactsPage from "./pages/FactsPage";
import FactPage from "./pages/FactPage";
import LoadingPage from "./pages/LoadingPage";
import VisitedPage from "./pages/VisitedPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuizScorePage from "./pages/QuizScorePage";
import ScorePage from "./pages/ScorePage";

const URL = `inwestycje.ddns.net`;
// const URL = `192.168.100.2`;
const API_URL = URL + ':5000';
const APP_URL = URL + ':3000';

export { API_URL, APP_URL };

export default function App() {

    const refreshToken = async () => {
        if(!localStorage.getItem('accessToken')) {
            console.log("no token to refresh");
            return;
        }

        try {
            const url = `http://${API_URL}/api/auth/refresh`;
            const {data} = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if(data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }
        } catch (e) {
            if(e.response) {
                console.log(e.response);
                console.log(e.response.data.status + ' ' + e.response.data.error + ': ' + e.response.data.message);
            } else {
                console.log(e.message);
            }
        }
    };

    refreshToken();

    return (
        <Switch>
            <Route path="/loading" component={LoadingPage} />
            <Route exact path="/" component={HomePage}/>
            <PrivateRoute path="/quiz" component={QuizPage} roleNeeded="ROLE_USER" />
            <PrivateRoute path="/scorePage" component={ScorePage} roleNeeded="ROLE_USER" />
            <PrivateRoute path="/visited" component={VisitedPage} roleNeeded="ROLE_USER" />
            <PrivateRoute path="/quizScores/" component={QuizScorePage} roleNeeded="ROLE_ANIA" />
            <PrivateRoute path="/facts" component={FactsPage} roleNeeded="ROLE_ADMIN" />
            <PrivateRoute path="/questions" component={QuestionsPage} roleNeeded="ROLE_ADMIN" />
            <PrivateRoute path="/qr/:uuid" component={FactPage} roleNeeded="ROLE_USER" />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route component={Error404} />
        </Switch>
    )
}