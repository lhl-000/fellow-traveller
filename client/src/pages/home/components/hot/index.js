import React, { useEffect, memo } from 'react';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi'
import { districtMap } from '@/asserts/districtMap';

function Hot(props) {

    useEffect(() => {
        console.log(districtMap);
    }, [])

    return (
        <div className='hot'>
            <h1>Popular people</h1>
            <div className='hot-lists'>
                    {props?.people?.map(item => {
                        return(
                        <div className='hot-lists-item' key={item.userId}>
                            <div className='profilePicture'>
                                <img alt='img' src={item.avatar} />
                            </div>
                            <div className='name'><span>{item.username}</span>&nbsp;</div>
                            {item.userSex === 'M'
                                ? <div className='status'><BiMaleSign style={{ 'color': 'blue'}}></BiMaleSign></div> 
                                : <div className='status'><BiFemaleSign style={{ 'color': 'pink'}}></BiFemaleSign></div>}
                            <div className='info'>
                                <div className='info-start'>Start: {districtMap.get(item.startCity)} ({districtMap.get(item.startNation)})</div>
                                <div className='info-destination'>Destination: {districtMap.get(item.destCity)} ({districtMap.get(item.destNation)})</div>
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