import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { loginAsync } from '@/redux/actions/user';
import { useDispatch} from 'react-redux';
import { base_url } from '@/enum/common';
import cookie from 'react-cookies';
import './index.scss';

import WebIM from '@/config/WebIM'

function Login(props) {

    const { getFieldProps, validateFields } = props.form;

    const [imgSrc, setImgSrc] = useState(base_url+'/img/getVerifyCode');

    const dispatch = useDispatch();

    let timer = null;

    let conn = null;

    const webIM_login = (username, password) =>{
      return { 
          user: username,
          pwd: password,
          appKey: WebIM.config.appkey,
          success: function (res) {
            var token = res.access_token;
            cookie.save('im_token', token)
          },
          error: function(){
          }
        }
    }

    const handleSubmit = () => {
        validateFields((error, value) => {
            if (error) {
              Toast.fail('Please fill the information completely');
              return;
            } else {
              const options = webIM_login(value.username, value.password);
              conn = WebIM.conn;
              conn.open(options);
              conn.listen({
                    onOpened: function ( message ) { 
                    },  
                    onClosed: function ( message ) {
                    },         //连接关闭回调
                    onTextMessage: function ( message ) {
                    },    //收到文本消息 
                    onError: function ( message ) {
                        // Toast.fail("Failed to send message, try to refresh the page")
                    },          //失败回调
                    onReceivedMessage: function(message){
                    },    //收到消息送达服务器回执
            }); 
              dispatch(loginAsync(value, props.history, props?.location?.state?.preUrl));
              timer = setTimeout(()=>{
                handleVerifyCode()
              }, 1000);
            }
          });
    }

    useEffect(() => {
      return () => {
        if (timer != null) {
          clearTimeout(timer);
        }
        if (conn != null) {
          conn.close();
        }
      }
    }, [])

    const handleVerifyCode = ()=> {
      setImgSrc(base_url+'/img/getVerifyCode'+ Math.random())
      }

    const handleClick = () => {
        props.history.push('/register');
    };

    return (
        <div className='login-page'>
           <List
            renderHeader={() => 'Login'}
           >
                <InputItem 
                {...getFieldProps('username', {
                rules: [{ required: true }]
                })}
                placeholder='username'>
                Username:
                </InputItem>
                <InputItem 
                {...getFieldProps('password', {
                    rules: [{ required: true }]
                    })}
                type='password'
                placeholder='password'>
                Password:
                </InputItem>
                <InputItem 
                {...getFieldProps('verifyCode', {
                    rules: [{ required: true }]
                    })}
                placeholder=''>
                Verify code:
                </InputItem>
           </List>
           <img className="verifyCode" style={{height:40,width:100}} src={imgSrc} onClick={handleVerifyCode} alt="验证码" />
           <Button type='warning' onClick={handleSubmit}>Log in</Button>
           <div className='register' onClick={handleClick}>Still no account? Go to register</div>
        </div>
    )
}

export default createForm()(Login);
