import React, { useState } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { loginAsync } from '@/redux/actions/user';
import { useDispatch} from 'react-redux';
import cookie from 'react-cookies';
import './index.scss';

import WebIM from '@/config/WebIM'

function Login(props) {

    const { getFieldProps, validateFields } = props.form;

    const [imgSrc, setImgSrc] = useState('http://localhost:8080/api/img/getVerifyCode');

    const dispatch = useDispatch();

    const webIM_login = (username, password) =>{
      return { 
          user: username,
          pwd: password,
          appKey: WebIM.config.appkey,
          success: function (res) {
            var token = res.access_token;
            cookie.save('im_token', token)
          },      
        }
    }

    const handleSubmit = () => {
        validateFields((error, value) => {
            if (error) {
              Toast.fail('Please fill the information completely');
              return;
            } else {
              dispatch(loginAsync(value, props.history));
              const options = webIM_login(value.username, value.password);
              WebIM.conn.open(options);
            }
          });
    }

    const handleVerifyCode =  ()=> {
      setImgSrc('http://localhost:8080/api/img/getVerifyCode'+ Math.random())
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
