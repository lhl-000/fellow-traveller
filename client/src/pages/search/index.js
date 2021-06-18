import React, { useState, useEffect } from 'react'
import { SearchBar, ActivityIndicator } from 'antd-mobile'
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks'
import { ShowLoading } from '../../components'
import { CommonEnum } from '@/enum'

import './index.scss';

import { peopleLoading, people } from '../../mock/people'

export default function Search(props) {
    const [peopleName, setPeopleName] = useState('');
    const [page, setPage] = useState(CommonEnum.PAGE);

    const [peopleLists, setPeopleLists] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const [peopleSubmitName, setPeopleSubmitName] = useState('');

    // const query = new URLSearchParams(props.location.search);
    // const [people, peopleLoading] = useHttpHook({
    //     url: '/people/search',
    //     body: {
    //     //   ...page,
    //     //   peopleName,
    //     //   startNation: query?get('startNation'),
    //     //   startCity: query?.get('startCity'),
    //     //   destinationNation: query?.get('destinationNation'),
    //     //   destinationCity: query?.get('destinationCity=10001'),
    //     //   startTime: query?.get('startTime') + '0:0:0'
    //     //   endTime: query?.get('endTime') + ' 23:59:59'
    //     },
    //     // watch: [page.pageNum, peopleSubmitName]
    //   });
    
    useObserverHook(CommonEnum.LOADING_ID,(entries) => {
        if (entries[0].isIntersecting) {
            setPage({
                ...page,
                pageNum: page.pageNum + 1
            })
        }
    }, null);

    useImgHook('.item-img', (enties) => {
        
    }, null)

    useEffect(() => {
        setPeopleLists([...peopleLists, ...people]);
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
    }, [peopleLoading, peopleSubmitName]);

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
            {!peopleLists.length 
                ? <ActivityIndicator toast />
                : <div className='result'>
                    {peopleLists.map( item => (
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
