import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies';

function AuthRouter(props) {
 
    const { component: Component, ...rest } = props
    const isLogIn = cookie.load('user') ? true : false;
    return (
        <Route {...rest} render={(props) => (
            isLogIn
                ? <Component {...props} />
                : <Redirect to="/login" />
        )} />
    )
    
}

export default withRouter(AuthRouter); 
