import React, { useState, useEffect } from 'react'

export default function Hot(props) {

    useEffect(() => {

    }, [])

    return (
        // <div className='hot'>
        //     <h1>hot group</h1>
        //     <div className='hot-lists'>
        //             {props?.groups?.map(item => {
        //                 return(
        //                 <div className='hot-lists-item'>
        //                     <div className='title'>{item.title}</div>
        //                     <div className='info'>
        //                         {item.info.map(item => {
        //                             return (<div className='info-tags'>&nbsp;{item}&nbsp;</div>) 
        //                         })}
        //                     </div>
        //                     <div className='mumbers'><span className='num'>&nbsp;&nbsp;&nbsp;&nbsp;{item.mumbers}</span> people are chatting now!</div>
        //                 </div>
        //                 )
        //             })}
        //     </div>
        // </div>
        <div className='hot'>
            <h1>hot people</h1>
            <div className='hot-lists'>
                    {props?.people?.map(item => {
                        return(
                        <div className='hot-lists-item'>
                            <div className='profilePicture'>
                                <img alt='img' src={''} />
                            </div>
                            <div className='name'>&nbsp;&nbsp;{item.name}&nbsp;&nbsp;</div>
                            {item.isOnline
                                ? <div className='status' style={{ 'background-color': 'yellowgreen'}}>&nbsp;Online&nbsp;</div> 
                                : <div className='status' style={{ 'background-color': 'grey'}}>&nbsp;Offline&nbsp;</div>}
                            <div className='info'>
                                <div className='info-start'>Start: {item.startCity} ({item.startNation})</div>
                                <div className='info-destination'>Destination: {item.destinationCity} ({item.destinationNation})</div>
                                <div className='times'>Planned time: {item.startTime} ~ {item.endTime} </div>
                            </div>
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}
