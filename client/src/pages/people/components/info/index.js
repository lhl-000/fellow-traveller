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
                <div className='name'>name</div>
                <div className='status'></div>
            </div>
            <div className='info-start'>Start point:</div>
            <div className='info-destination'>Destination</div>
            <div className='times'>Planned Time:</div>
            <div className='vehicle'>Vehicle:  Number:</div>
            <div className='meg-board'>message board
                <div className='meg'></div>
            </div>
            <Button className='info-chat-but' type='warning'>Chat</Button>
        </div>
    )
}