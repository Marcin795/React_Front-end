import React from "react";
import { Redirect } from "react-router-dom";
import useLogIn from "../hooks/useLogIn";


export default function LogoutPage() {

    const { isLoggedIn, logOut } = useLogIn();

    const logout = () => {
        if(isLoggedIn) {
            console.log("logging out");
            localStorage.removeItem('accessToken');
            logOut();
        }
    };

    logout();

    return (
        <Redirect to={"/"} />
    )
}