import React from 'react'
import { Button } from 'antd-mobile';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { districtMap } from '@/asserts/districtMap';
import { useHistory } from 'react-router-dom';
import qqChatImg from '../../../../asserts/qqchat.png'

export default function Info(props) {

    const history = useHistory();
    
    const handleClick = () => {
        history.push({
            pathname: '/chat/private',
            search: `?name=${props.detail.username}`,
            // state: {preUrl: window.location.pathname+window.location.search}
        })
    }

    let qqChatLinkForPC = 'http://wpa.qq.com/msgrd?v=3&uin=' + props.detail.qq + '&site=qq&menu=yes';
    let qqChatLinkForAnd = 'mqqwpa://im/chat?chat_type=wpa&uin='+props.detail.qq;
    let qqChatLinkForIos= 'mqq://im/chat?chat_type=wpa&uin='+props.detail.qq+'&version=1&src_type=web';

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
            {props.detail?.transfer1Nation == (30000 || 0) ? <></>:
                <div className='info-start'>No.1 Transfer station:  {districtMap.get(props.detail?.transfer1Nation)} ----- {districtMap.get(props.detail?.transfer1City)}</div>
            }
            {props.detail?.transfer2Nation == (30000 || 0) ? <></>:
                <div className='info-start'>No.2 Transfer station:  {districtMap.get(props.detail?.transfer2Nation)} ----- {districtMap.get(props.detail?.transfer2City)}</div>
            }
            {props.detail?.transfer3Nation == (30000 || 0) ? <></>:
                <div className='info-start'>No.3 Transfer station:  {districtMap.get(props.detail?.transfer3Nation)} ----- {districtMap.get(props.detail?.transfer3City)}</div>
            }
            {props.detail?.transfer4Nation == (30000 || 0) ? <></>:
                <div className='info-start'>No.4 Transfer station:  {districtMap.get(props.detail?.transfer4Nation)} ----- {districtMap.get(props.detail?.transfer4City)}</div>
            }
            <div className='info-destination'>Destination: {districtMap.get(props.detail?.destNation)} ----- {districtMap.get(props.detail?.destCity)}</div>
            <div className='times'>Depature Time: {props.detail?.startTime?.split(' ')[0]} ----- {props.detail?.endTime?.split(' ')[0]}</div>
            <div className='vehicle'>Favorite vehicle: {props.detail?.perfVehicle}</div>
            {/* <div className='email'>Email: {props.detail?.email}</div> */}
            <div className='meg-board'>
                <div className='meg'>Sign: {props.detail?.meg} </div>
            </div>
            {/* <Button className='info-chat-but' type='warning' onClick={handleClick}>Chat</Button> */}
            {
                props.detail.qq > 0?
                <div className='chats'>
                <Button className='interchat' type='warning' onClick={handleClick}>Chat</Button>
                    <div className='qqchat'>
                        {/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) == true?
                                                <a href={qqChatLinkForIos} target="_blank" >
                                                <img alt='QQchat' src={qqChatImg}></img></a>
                                                :
                                                /(Android)/i.test(navigator.userAgent)? 
                                                <a href={qqChatLinkForAnd} target="_blank" >
                                                <img alt='QQchat' src={qqChatImg}></img></a>
                                                :
                                                <a href={qqChatLinkForPC} target="_blank" >
                                                <img alt='QQchat' src={qqChatImg}></img></a>
                    }
                    </div>
                </div>
                :
                <Button className='info-chat-but' type='warning' onClick={handleClick}>Chat</Button>

            }

        </div>
    )
}