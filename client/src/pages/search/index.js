import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator, Toast} from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { ShowLoading } from '../../components';
import { CommonEnum } from '@/enum';
import { districtMap } from '@/asserts/districtMap';
import { useHistory } from 'react-router-dom';
import './index.scss';

export default function Search(props) {
    const [peopleName, setPeopleName] = useState('');
    const [page, setPage] = useState(CommonEnum.PAGE);

    const [peopleLists, setPeopleLists] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const [peopleSubmitName, setPeopleSubmitName] = useState('');

    const query = new URLSearchParams(props.location.search);

    const history = useHistory();

    const handleClick = (value) => {
        history.push({
            pathname: '/people',
            search: `?id=${value}`
        })
    }

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

    // const handleCancel = (value) => {
    //     setPeopleName('');
    //     _handleSumbit(value);
    // }

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
                cancelText='cancel'
                onSubmit={handleSumbit}
            />
            {!peopleLists.length && showLoading
                ? <ActivityIndicator toast />
                : <div className='result'>
                    {peopleLists.map( item => (
                        <div className='item' key={item.username} onClick={()=>handleClick(item.userId)}>
                            <img alt='img' src={''}  data-src={item.avatar} className='item-img'></img>
                            <div className='item-right'>
                                <div className='name'>{item.username}&nbsp;&nbsp;
                                {item.userSex === 'M'
                                ? <div className='status'><BiMaleSign style={{ 'color': 'blue'}}></BiMaleSign></div> 
                                : <div className='status'><BiFemaleSign style={{ 'color': 'pink'}}></BiFemaleSign></div>}
                                </div>
                                <div className='info'>
                                <div className='info-start'>Start point: {districtMap.get(item.startCity)}, {districtMap.get(item.startNation)}</div>
                                <div className='transfor'>Transfor station: {districtMap.get(item.transfer1City)}
                                {item.transfer2City==30001? <></> : <span>&nbsp;{districtMap.get(item.transfer2City)}</span> }
                                {item.transfer3City==30001? <></> : <span>&nbsp;.....</span> }
                                {/* {item.transfer4City==30001? <></> : <span>&nbsp;{districtMap.get(item.transfer4City)}</span> } */}
                                </div>
                                <div className='info-destination'>Destination: {districtMap.get(item.destCity)}, {districtMap.get(item.destNation)}</div>
                                <div className='times'>Depature time: <span>{item.startTime.split(' ')[0]} ~ {item.endTime.split(' ')[0]}</span>  </div>
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

