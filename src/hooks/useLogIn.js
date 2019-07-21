import { useState, useEffect } from 'react'
import ParseJWT from "../util/ParseJWT";

export default function useLogIn() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);
    const [user, setUser] = useState(isLoggedIn ?
        (({ email, name, roles: [{authority: role}] }) => ({ email, name, role }))(ParseJWT()) :
        {}
    );

    const setToken = (token) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
    };

    const logOut = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        setUser({})
    };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('accessToken') !== null);

        if(isLoggedIn ) {
            const user = (({ email, name, roles: [{authority: role}] }) => ({ email, name, role }))(ParseJWT());
            setUser(user);
        }
    }, [isLoggedIn]);

    return { isLoggedIn, user, setToken, logOut }
}