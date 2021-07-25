import React, { useState, useEffect } from 'react'
import { Toast } from 'antd-mobile';
import Footer from './components/footer';
import Header from './components/header';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';
import { timer } from '@/utils';
import './index.scss';

import WebIM from '@/config/WebIM'

export default function Page(props) {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const name = query?.get('name');
    const user = jwt_decode(cookie.load('token')).sub;
    const [message, setMessage] = useState('');
    const [chatLists, setChatLists] = useState([]);

    let conn = null;
    const handleSubmit = () => {
        if (message == '') {
            Toast.fail('message cannot be empty')
        }
        sendPrivateText(message, name);
        setMessage('');
        setChatLists([...chatLists, {
            from: user,
            to: name,
            data: message,
            time: new Date().getTime()
        }])
    }

    const pageInit = async () => {
        conn = WebIM.conn;  
        await conn.open(
            {
                user: user,
                accessToken: cookie.load('im_token'),
                appKey: WebIM.config.appkey
            }
    );

    conn.fetchHistoryMessages(
        {
            queue: name, //需特别注意queue属性值为大小写字母混合，以及纯大写字母，会导致拉取漫游为空数组，因此注意将属性值装换为纯小写
            isGroup: false,
            count: 10,
            success: function(res){
                let historyMessages = []
                res.map((item) => {
                    historyMessages.push(
                        {
                            from: item.from,
                            to: item.to,
                            data: item.data,
                            time: item.time,
                        }
                    )
                })
                console.log(historyMessages);
                setChatLists([ ...historyMessages,...chatLists])
            },
            fail: function(){
                console.log('failed to fetch history messages');
            }
        }
    ).catch((e) => {})

    conn.listen({
        // onOpened: function ( message ) { //连接成功回调
        //     console.log(message);
        // },  
        // onClosed: function ( message ) {
        //     console.log(message);
        // },         //连接关闭回调
        onTextMessage: function ( message ) {
            setChatLists([...chatLists,
            {
                from: message.from,
                to: message.to,
                data: message.data,
                time: message.time,
            }]);
        },    //收到文本消息 
        // onError: function ( message ) {
        //     // Toast.fail("Failed to send message, try to refresh the page")
        // },          //失败回调
        // onReceivedMessage: function(message){

        // },    //收到消息送达服务器回执
}); 
                    //获得历史消息

    }

    // const scrollButtom = () => {
    //     const div = document.getElementById('buttom');
	//     div.scrollTop = div.scrollHeight;
    // }

    useEffect(() => {
        pageInit()
    }, []);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [chatLists])

    function sendPrivateText(meg, target) {
        if (conn == null) {
            conn = WebIM.conn
        }
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

    return (
       <div className='private-chat-page'>
           <Header name={name} location={props?.location} />
            <div className='message-lists'>
                {chatLists.map((item) => {
                    return (
                        <div className='message-item' key={item.time + item.data}>
                            <div className={ `message-content ${item.from === user? 'my': 'target'}`}>
                                <div className='from'>{item.from}</div>
                                <div className='meg'>{item.data}</div>
                                <div className='time'>{timer(item.time)}</div>
                            </div>
                        </div>
                    )
                })}
                {/* <div id='buttom'></div> */}
            </div>
           <Footer
                handleSubmit={handleSubmit}
                setMessage={setMessage}
                message={message}
           ></Footer>
       </div>
    )
}
