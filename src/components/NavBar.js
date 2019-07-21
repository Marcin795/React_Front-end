import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import useLogIn from "../hooks/useLogIn";

export default function NavBar() {

    const { isLoggedIn, user } = useLogIn();

    return (
        <header>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                <Link to={'/'} className="navbar-brand">
                    <img src={window.location.origin + '/qrlogo.png'} height="42" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to={'/'} className="nav-link" activeClassName="active">Home</NavLink>
                        </li>
                        { isLoggedIn && user.role === 'ROLE_USER' ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to={'/quiz'} className="nav-link" activeClassName="active">Quiz</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink to={'/visited'} className="nav-link" activeClassName="active">Visited</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/logout'} className="nav-link" activeClassName="active">Logout</NavLink>
                                </li>
                            </>
                        ) : isLoggedIn && user.role === 'ROLE_ADMIN' ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to={'/facts'} className="nav-link" activeClassName="active">Facts</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/questions'} className="nav-link" activeClassName="active">Questions</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/logout'} className="nav-link" activeClassName="active">Logout</NavLink>
                                </li>
                            </>
                        ) : isLoggedIn && user.role === 'ROLE_ANIA' ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to={'/quizScores'} className="nav-link" activeClassName="active">Quiz Scores</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/logout'} className="nav-link" activeClassName="active">Logout</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to={'/login'} className="nav-link" activeClassName="active">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/register'} className="nav-link" activeClassName="active">Register</NavLink>
                                </li>
                            </>
                        )}


                    </ul>
                </div>
            </nav>
        </header>
    )
}