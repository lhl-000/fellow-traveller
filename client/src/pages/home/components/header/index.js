import React,{Component} from "react";
import {Link} from "react-router-dom";

export default function header() {
    return (
        <div className='header'>
            <div className='header_title'>Fellow Traveller</div>
            <div className='header_login'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div> 
        </div>
    )
}
