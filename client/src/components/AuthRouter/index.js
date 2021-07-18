import React from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies';

function AuthRouter(props) {
 
    const { component: Component, im, ...rest } = props
    const isLogIn = cookie.load('token') ? true : false;
    let isIMLogin = true;
    if (im) {
        isIMLogin = cookie.load('im_token') ? true : false;
    }
    return (
        <Route {...rest} render={(props) => (
            isLogIn && isIMLogin
                ? <Component {...props} />
                : <Redirect to="/login" />
        )} />
    )
    
}

export default withRouter(AuthRouter); 
