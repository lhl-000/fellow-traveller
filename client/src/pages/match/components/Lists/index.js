import React from 'react'
import { ChatSkeletons } from '@/skeletons';
import { useImgHook } from '@/hooks';
import { ShowLoading } from '@/components';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { districtMap } from '@/asserts/districtMap';
import { useHistory } from 'react-router-dom';
export default function Lists(props) {
    const { people, showLoading } = props;

    useImgHook('.item-img', (enties) => {
        
    }, null);

    const history = useHistory();

    const handleClick = (value) => {
        history.push({
            pathname: '/people',
            search: `?id=${value}`
        })
    }

    return (
        <div className='match-page-people'>
            {!people.length 
                ? <ChatSkeletons />
                : <div className='result'>
                    {people.map( item => (
                        <div className='item' key={item.userId} onClick={()=>handleClick(item.userId)}>
                            <img alt='img' src={''}  data-src={item.avatar} className='item-img'></img>
                            <div className='item-right'>
                                <div className='name'>{item.username}&nbsp;&nbsp;
                                {item.userSex === 'M'
                                ? <span className='status'><BiMaleSign style={{ 'color': 'blue'}}></BiMaleSign></span> 
                                : <span className='status'><BiFemaleSign style={{ 'color': 'pink'}}></BiFemaleSign></span>}
                                </div>
                                <div className='info'>
                                <div className='info-start'>Start point: {districtMap.get(item.startCity)}, {districtMap.get(item.startNation)}</div>
                                <div className='info-destination'>Destination: {districtMap.get(item.destCity)}, {districtMap.get(item.destNation)}</div>
                                <div className='info-perfVhicle'>Perfer Vehicle: {item.perfVehicle}</div>
                                <div className='times'> Planned time: <span>{item.startTime.split(' ')[0]} ~ {item.endTime.split(' ')[0]}</span>  </div>
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
