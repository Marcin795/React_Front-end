import React from "react";
import { Redirect, Route } from "react-router-dom";
import useLogIn from "../hooks/useLogIn";


export default function PrivateRoute({component: Component, roleNeeded, ...props}) {

    const { isLoggedIn, user } = useLogIn();

    if(isLoggedIn && !( user.role === 'ROLE_ADMIN' || user.role === roleNeeded ) ) {
        console.log(user.role !== 'ROLE_ADMIN');
        return <Redirect to="/" />
    }

    return (
        <Route
            {...props}
            render={ innerProps =>
                isLoggedIn ?
                    <Component { ...innerProps } />
                    :
                    <Redirect to={{
                        pathname: "/register",
                        state: { from: props.location }
                    }} />
            }
        />
    )
}