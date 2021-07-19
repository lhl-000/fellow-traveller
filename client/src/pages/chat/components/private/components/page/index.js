import React, { useState, useEffect } from 'react'
import { Toast} from 'antd-mobile';
import Footer from './components/footer';
import Header from './components/header';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';
import './index.scss';

import WebIM from '@/config/WebIM'

export default function Page(props) {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const name = query?.get('name');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (message == '') {
            Toast.fail('message cannot be empty')
        }
        sendPrivateText(message, name);
        setMessage('');
    }

    const conn = WebIM.conn;
    //连接
    conn.open(
        {
            user: jwt_decode(cookie.load('token')).sub,
            accessToken: cookie.load('im_token'),
            appKey: WebIM.config.appkey
        }
    );


    function sendPrivateText(meg, target) {
        let id = conn.getUniqueId();                 // 生成本地消息id
        let msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
            msg: meg,                  // 消息内容
            to: target,                          // 接收消息对象（用户id）
            chatType: 'singleChat',                  // 设置为单聊                        //扩展消息
            success: function (id, serverMsgId) {
                console.log('send private text Success');  
            }, 
            fail: function(e){
                console.log("Send private text error");  
            }
        });
        conn.send(msg.body);
    };

    conn.listen({
        onOpened: function ( message ) {          //连接成功回调
            console.log(message);
        },  
        onClosed: function ( message ) {
            console.log(message);
        },         //连接关闭回调
        onTextMessage: function ( message ) {
            console.log(message);
        },    //收到文本消息   //本机网络掉线
        onError: function ( message ) {
            console.log(message);
        },          //失败回调
        onReceivedMessage: function(message){
            console.log(message);
        },    //收到消息送达服务器回执
    });

        //获得历史消息
        conn.fetchHistoryMessages(
            {
                queue: name, //需特别注意queue属性值为大小写字母混合，以及纯大写字母，会导致拉取漫游为空数组，因此注意将属性值装换为纯小写
                isGroup: false,
                count: 10,
                success: function(res){
                   console.log(res) //获取拉取成功的历史消息
                },
                fail: function(){}
            }
        )

    return (
       <div className='private-chat-page'>
           <Header name={name} location={props?.location} />

           <Footer
                handleSubmit={handleSubmit}
                setMessage={setMessage}
                message={message}
           ></Footer>
       </div>
    )
}
