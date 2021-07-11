import React, { useEffect, memo } from 'react';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi'

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
                                <img alt='img' src={item.avatar} />
                            </div>
                            <div className='name'><span>{item.username}</span>&nbsp;</div>
                            {item.userSex === 'M'
                                ? <div className='status'><BiMaleSign style={{ 'color': 'blue'}}></BiMaleSign></div> 
                                : <div className='status'><BiFemaleSign style={{ 'color': 'pink'}}></BiFemaleSign></div>}
                            <div className='info'>
                                <div className='info-start'>Start: {item.startCity} ({item.startNation})</div>
                                <div className='info-destination'>Destination: {item.destCity} ({item.destNation})</div>
                                <div className='times'>Planned time: {item.startTime.split(' ')[0]} ~ {item.endTime.split(' ')[0]} </div>
                            </div>
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}


export default memo(Hot);