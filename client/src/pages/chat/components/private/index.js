import React, { useState, useEffect } from 'react'
import Lists from './components/lists';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';
import WebIM from '@/config/WebIM';
import './index.scss';
export default function Private() {

    const [sesionList, setSesionList] = useState([]);

    const user = jwt_decode(cookie.load('token')).sub;
    const token = cookie.load('im_token')
    const options = {
        user: user,
        accessToken: token,
        appKey: WebIM.config.appkey,
    };

    let conn = null;

    const listInit =  () => {
        conn = WebIM.conn;
        conn.open(options);

        conn.listen({
            onOpened: function ( message ) { //连接成功回调
                console.log(message);
            },  
            onClosed: function ( message ) {
                console.log(message);
            },         //连接关闭回调
            onTextMessage: function ( message ) {
                console.log(message);
            },    //收到文本消息 
            onError: function ( message ) {
                // Toast.fail("Failed to send message, try to refresh the page")
            },          //失败回调
            onReceivedMessage: function(message){
    
            },    //收到消息送达服务器回执
    }); 
        setTimeout(()=>{
            conn.getSessionList().then((res) => {
                setSesionList([...sesionList, ...res.data.channel_infos]);
                }).catch((e) => {})
        }, 500)
    }

    useEffect(() => {
        listInit();
        return(()=>{
            if (conn != null) {
                conn.close();
            }
        })
    }, [])
    return (
        <div>
            <Lists user={user} sesionList={sesionList}/>
        </div>
    )
}
