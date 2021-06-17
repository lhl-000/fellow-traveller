import React, { useState, useEffect } from 'react'
import { SearchBar, ActivityIndicator } from 'antd-mobile'
import { useHttpHook } from '@/hooks'

import './index.scss';

import { peopleLoading, people } from '../../mock/people'

export default function Search() {
    const [peopleName, setPeopleName] = useState('');

    // const [people, peopleLoading] = useHttpHook({
    //     url: '/people/search',
    //     body: {
    //     //   ...page,
    //     //   houseName,
    //     //   nation: query?.nation,
    //     //   city: query?.city,
    //     //   startTime: query?.startTime + ' 00:00:00',
    //     //   endTime: query?.endTime + ' 23:59:59'
    //     },
    //     // watch: [page.pageNum, houseSubmitName]
    //   });
    
    const handleChange = (value) => {
        setPeopleName(value);
    }

    const handleCancel = () => {
        
    }

    return (
        <div className='search-page'>
            <SearchBar
                placeholder='Search fellow travelers'
                value={peopleName}
                onChange={handleChange}
                onCancel={handleCancel}
            />
            {peopleLoading 
                ? <ActivityIndicator toast />
                : <div className='result'>
                    {people.map( item => (
                        <div className='item'>
                            <img alt='img' src={''}></img>
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
                </div>
            }
        </div>
    )
}

