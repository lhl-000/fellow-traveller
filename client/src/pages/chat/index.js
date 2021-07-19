import React from 'react'
import Header from './components/header';
import Private from './components/private';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';

import WebIM from '@/config/WebIM'

export default function Chat() {

    const options = {
        user: jwt_decode(cookie.load('token')).sub,
        accessToken: cookie.load('im_token'),
        appKey: WebIM.config.appkey
    };
    WebIM.conn.open(options);
   
    // WebIM.conn.getRoster({
    //     success: function (res) {
    //         console.log('获取好友', res)
    //     }
    // })

    return (
        <div>
            <Header><Private/></Header>
        </div>
    )
} 