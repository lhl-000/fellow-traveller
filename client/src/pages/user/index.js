import React, {useEffect } from 'react';
import { Button, List, Toast} from 'antd-mobile';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getUserAsync } from '@/redux/actions/user';
import cookie from 'react-cookies';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './index.scss';

import WebIM from '@/config/WebIM';

export default function User(props) {

    const selector = (state) => ({
        username: state.user.username,
        avatar: state.user.avatar,
        meg: state.user.meg,
    }); 

    const dispatch = useDispatch();

    const username = jwt_decode(cookie.load('token')).sub;

    const { avatar, meg } = useSelector(selector, shallowEqual);

    const history = useHistory();

    const handleClick = () => {
        props.history.push('user/edit');
    };

    const handleAgreement = () => {
        Toast.info("User agreement will be available in the next version", 1)
    }

    const handleProblem= () => {
        Toast.info("Common problem will be available in the next version", 1)
    }

    const handleContact = () => {
        Toast.info("Please send email to fr20938@bristol.ac.uk", 2)
    }

    useEffect(() => {
        dispatch(getUserAsync({
            username : username,
          }));
      }, [])

      const handleButtom = () => {
        cookie.remove('token');
        cookie.remove('im_token')
        history.push('./')
      }

    return (
        <div className='user-page'>
            <div className='info'>
                <div className='set' onClick={handleClick}>Setting</div>
                <div className='user'>
                    <img alt='user' src={avatar} />
                    <div className='name'>{username}</div>
                    <div className='sign'>Sign: {meg}</div>
                </div>
            </div>
            <div className='lists'>
                <List>
                    <List.Item arrow='horizontal' onClick={handleAgreement}>
                        User agreement
                    </List.Item>
                    <List.Item arrow='horizontal' onClick={handleProblem}>
                        Common problem
                    </List.Item>
                    <List.Item arrow='horizontal' onClick={handleContact}>
                        Contact me
                    </List.Item>
                </List>
            </div>
            <Button className='logout-btn' type='warning' style={{ marginTop: '20px' }} onClick={handleButtom}>Logout</Button>
        </div>
    )
}

