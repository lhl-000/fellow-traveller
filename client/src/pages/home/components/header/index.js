import React, { useState, useEffect, memo } from 'react'
import {Link} from "react-router-dom";
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";

function Header() {

    useEffect(() => {
    }, [])

    return (
        <div className='header'>
            <div className='header_title'>Fellow Traveller</div>
            <div className='header_login'>
                {cookie.load('token')? jwt_decode(cookie.load('token')).sub : 
                <>
                <Link to='/login'>Login</Link> 
                <span> | </span>
                <Link to='/register'>Register</Link>
                </>
                }
            </div> 
        </div>
    )
}

export default memo(Header);