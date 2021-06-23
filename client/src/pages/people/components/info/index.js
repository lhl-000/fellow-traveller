import React, { useState, useEffect } from 'react'
import { Button } from 'antd-mobile';

export default function Info(props) {

    const [state, setstate] = useState();

    return (
        <div className='info'>
            <div className='info-top'>
                <div className='profilePicture'>
                    <img alt='pic' src=''></img>
                </div>
                {props.detail?.isOnline
                    ? <div className='status' style={{ 'background-color': 'yellowgreen' }}>&nbsp;Online&nbsp;</div>
                    : <div className='status' style={{ 'background-color': 'grey' }}>&nbsp;Offline&nbsp;</div>}
            </div>
            <div className='info-start'>Start point: {props.detail?.startNation} ----- {props.detail?.startCity}</div>
            <div className='info-destination'>Destination: {props.detail?.destinationNation} ----- {props.detail?.destinationCity}</div>
            <div className='times'>Planned Time: {props.detail?.startTime} ----- {props.detail?.endTime}</div>
            <div className='vehicle'>Vehicle: {props.detail?.vehicle}  Number: {props.detail?.number}</div>
            <div className='meg-board'>
                <div className='meg'>message board: {props.detail?.meg} </div>
            </div>
            <Button className='info-chat-but' type='warning'>Chat</Button>
        </div>
    )
}