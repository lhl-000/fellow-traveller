import React, { useState, useEffect } from 'react'
import Lists from './components/lists';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';
import WebIM from '@/config/WebIM';
import './index.scss';
export default function Private() {

    const [sesionList, setSesionList] = useState([]);

    const user = jwt_decode(cookie.load('token')).sub;

    const options = {
        user: user,
        accessToken: cookie.load('im_token'),
        appKey: WebIM.config.appkey,
    };
    
    const conn = WebIM.conn;
    conn.open(options);

    useEffect(() => {
        const conn = WebIM.conn;
        conn.open(options);
        conn.getSessionList().then((res) => {
            setSesionList([...sesionList, ...res.data.channel_infos]);
        })
    }, [])
    return (
        <div>
            <Lists user={user} sesionList={sesionList}/>
        </div>
    )
}
