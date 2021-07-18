import React, {useEffect } from 'react';
import { Button, List } from 'antd-mobile';
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

    useEffect(() => {
        dispatch(getUserAsync({
            username : username,
          }));
      }, [])

      const handleButtom = () => {
        cookie.remove('token');
        cookie.remove('im-token')
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
                    <List.Item arrow='horizontal'>
                        User agreement
                    </List.Item>
                    <List.Item arrow='horizontal'>
                        Common problem
                    </List.Item>
                    <List.Item arrow='horizontal'>
                        Contact me
                    </List.Item>
                </List>
            </div>
            <Button className='logout-btn' type='warning' style={{ marginTop: '20px' }} onClick={handleButtom}>Logout</Button>
        </div>
    )
}

