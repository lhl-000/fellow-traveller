import React from 'react'
import { List } from 'antd-mobile';

import './index.scss';

export default function User(props) {

    const avatar = '';
    const tel = '13232323';
    const sign = 'dsfaafsdf';

    const handleClick = () => {
        props.history.push(`user/edit?id=${10}`);
    };

    return (
        <div className='user-page'>
            <div className='info'>
                <div className='set' onClick={handleClick}>Setting</div>
                <div className='user'>
                    <img alt='user' src={avatar} />
                    <div className='tel'>{tel}</div>
                    <div className='sign'>{sign}</div>
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

