import React from 'react'
import { ChatSkeletons } from '@/skeletons';
import { ShowLoading } from '@/components';

export default function Lists(props) {
    const { people, showLoading } = props;

    return (
        <div match-page-people>
            {!people.length 
                ? <ChatSkeletons />
                : <div className='result'>
                    {people.map( item => (
                        <div className='item'>
                            <img alt='img' src={''}  data-src='' className='item-img'></img>
                            <div className='item-right'>
                                <div className='name'>{item.name}&nbsp;&nbsp;
                                {item.isOnline
                                ? <span className='status' style={{ 'background-color': 'yellowgreen'}}>&nbsp;Online&nbsp;</span> 
                                : <span className='status' style={{ 'background-color': 'grey'}}>&nbsp;Offline&nbsp;</span>}
                                </div>
                                <div className='info'>
                                <div className='info-start'>Start point: {item.startCity}, {item.startNation}</div>
                                <div className='info-destination'>Destination: {item.destinationCity}, {item.destinationNation}</div>
                                <div className='times'> Planned time: <span>{item.startTime} ~ {item.endTime}</span>  </div>
                            </div>
                            </div>
                        </div>
                    ))}
                    <ShowLoading showLoading={showLoading} />
                </div>
            }
        </div>
    )
}
