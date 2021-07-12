import React, { useState, useEffect } from 'react'
import { SearchBar, ActivityIndicator } from 'antd-mobile'
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks'
import { ShowLoading } from '../../components'
import { CommonEnum } from '@/enum'

import './index.scss';

export default function Search(props) {
    const [peopleName, setPeopleName] = useState('');
    const [page, setPage] = useState(CommonEnum.PAGE);

    const [peopleLists, setPeopleLists] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const [peopleSubmitName, setPeopleSubmitName] = useState('');

    const query = new URLSearchParams(props.location.search);

    const [people, peopleLoading] = useHttpHook({
        url: '/people/search',
        body: {
          ...page,
          peopleName,
          startNation: query?.get('startNation'),
          startCity: query?.get('startCity'),
          destNation: query?.get('destNation'),
          destCity: query?.get('destCity'),
          startTime: query?.get('startTime') + ' 00:00:00',
          endTime: query?.get('endTime') + ' 23:59:59'
        },
        watch: [page.pageNum, peopleSubmitName]
      });
    
    useObserverHook('#' + CommonEnum.LONDING_ID, (entries) => {
        if (!peopleLoading && entries[0].isIntersecting) {
            setPage({
                ...page,    
                pageNum: page.pageNum + 1,           
            })
        }
    }, null);

    useImgHook('.item-img', (enties) => {
        
    }, null);

    useEffect(() => {
        if (!peopleLoading && people) {
            if (people.length) {
                setPeopleLists([...peopleLists, ...people]);
                if (people.length < page.pageSize) {
                    setShowLoading(false);
                }
            } else {
                setShowLoading(false);
            }
        }
    }, [peopleLoading]);

    const handleChange = (value) => {
        setPeopleName(value);
    }

    const handleCancel = (value) => {
        setPeopleName('');
        _handleSumbit(value);
    }

    const handleSumbit = (value) => {
        _handleSumbit(value);
    }

    const _handleSumbit = (value) => {
        setPeopleName(value);
        setPeopleSubmitName(value);
        setPage(CommonEnum.PAGE);
        setPeopleLists([]);
    }

    return (
        <div className='search-page'>
            <SearchBar
                placeholder='Search fellow travelers'
                value={peopleName}
                onChange={handleChange}
                onCancel={handleCancel}
                onSubmit={handleSumbit}
            />
            {!peopleLists.length && showLoading
                ? <ActivityIndicator toast />
                : <div className='result'>
                    {peopleLists.map( item => (
                        <div className='item' key={item.username}>
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

