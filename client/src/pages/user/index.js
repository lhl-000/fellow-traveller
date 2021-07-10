import React, {useEffect } from 'react';
import { List } from 'antd-mobile';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getUserAsync } from '@/redux/actions/user';
import jwt_decode from "jwt-decode";
import cookie from 'react-cookies';
import './index.scss';

export default function User(props) {

    const selector = (state) => ({
        username: state.user.username,
        avatar: state.user.avatar,
        meg: state.user.meg,
    }); 

    const dispatch = useDispatch();

    const username = jwt_decode(cookie.load('token')).sub;

    const { avatar, meg } = useSelector(selector, shallowEqual);

    const handleClick = () => {
        props.history.push('user/edit');
    };

    useEffect(() => {
        dispatch(getUserAsync({
            username : username,
          }));
      }, [])

    return (
        <div className='user-page'>
            <div className='info'>
                <div className='set' onClick={handleClick}>Setting</div>
                <div className='user'>
                    <img alt='user' src={avatar} />
                    <div className='name'>{username}</div>
                    <div className='sign'>{meg}</div>
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
        </div>
    )
}

