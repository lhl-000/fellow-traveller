import React from 'react'
import { Button } from 'antd-mobile';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { districtMap } from '@/asserts/districtMap';
import { useHistory } from 'react-router-dom';

export default function Info(props) {

    const history = useHistory();
    
    const handleClick = () => {
        history.push({
            pathname: '/chat/private',
            search: `?name=${props.detail.username}`,
            // state: {preUrl: window.location.pathname+window.location.search}
        })
    }
    return (
        <div className='info' key={props.detail.userId}>
            <div className='info-top'>
                <div className='avatar'>
                    <img alt='pic' src={props.detail.avatar}></img>
                </div>
                <div>
                <div className='name'><span>{props.detail.username}</span></div>
                </div>
                {props.detail?.userSex === 'M'
                    ? <div className='status'><BiMaleSign style={{ 'color': 'blue'}}></BiMaleSign></div>
                    : <div className='status'><BiFemaleSign style={{ 'color': 'pink'}}></BiFemaleSign></div>}
            </div>
            <div className='info-start'>Start point: {districtMap.get(props.detail?.startNation)} ----- {districtMap.get(props.detail?.startCity)}</div>
            <div className='info-destination'>Destination: {districtMap.get(props.detail?.destNation)} ----- {districtMap.get(props.detail?.destCity)}</div>
            <div className='times'>Planned Time: {props.detail?.startTime?.split(' ')[0]} ----- {props.detail?.endTime?.split(' ')[0]}</div>
            <div className='vehicle'>Perfer vehicle: {props.detail?.perfVehicle}</div>
            <div className='email'>Email: {props.detail?.email}</div>
            <div className='meg-board'>
                <div className='meg'>Sign: {props.detail?.meg} </div>
            </div>
            <Button className='info-chat-but' type='warning' onClick={handleClick}>Chat</Button>
        </div>
    )
}