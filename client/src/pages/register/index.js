import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { registerAsync } from '@/redux/actions/user';
import { useDispatch} from 'react-redux';
import './index.scss';

function Register(props) {

    const dispatch = useDispatch();

    const { getFieldProps, validateFields } = props.form;

    const handleSubmit = () => {
        validateFields((error, value) => {
          if (error) {
            Toast.fail('Please fill the information completely');
            return;
          } else {
            if (value.password !== value.cfmPassword) {
              Toast.fail('The password and confirmed password must be the same');
              return;
            }
            dispatch(registerAsync(value, props.history));
          }
        });
      };
    
      const handleClick = () => {
        props.history.push('/login');
      };
    
      useEffect(() => {
    
      }, [])
    
      return (
        <div className='register-page'>
          <List
            renderHeader={() => 'User register'}
          >
            <InputItem
              {...getFieldProps('username', {
                rules: [{ required: true }]
              })}
              placeholder='username'
            >
              Username：
              </InputItem>
            <InputItem
              {...getFieldProps('password', {
                rules: [{ required: true }]
              })}
              placeholder='password'
            >
              Password：
              </InputItem>
            <InputItem
              {...getFieldProps('cfmPassword', {
                rules: [{ required: true }]
              })}
              placeholder='confirmed password'
            >Confirmed:
              </InputItem>
          </List>
          <Button type='warning' onClick={handleSubmit}>Register</Button>
          <div className='login' onClick={handleClick}>Already have the account? Go to log in</div>
        </div>
      )
    }
    
export default createForm()(Register)
