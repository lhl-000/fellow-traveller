import React, { useState, useEffect, memo } from 'react'

function Hot(props) {

    useEffect(() => {

    }, [])

    return (
        <div className='hot'>
            <h1>Popular people</h1>
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


export default memo(Hot);