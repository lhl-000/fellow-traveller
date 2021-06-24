import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import cookie from 'react-cookies'
export default function Header() {

    useEffect(() => {
        console.log(cookie.load('user'));
    }, [])

    return (
        <div className='header'>
            <div className='header_title'>Fellow Traveller</div>
            <div className='header_login'>
                {cookie.load('user')? cookie.load('user').username : 
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