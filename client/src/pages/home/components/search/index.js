import React, { useState, useEffect } from 'react'
import { Picker, List, Calendar, Button } from 'antd-mobile'
import dayjs from 'dayjs'

export default function Search(props) {
    // const [cities, setCities] = useState([[{label: 'Bristol', value: '00001'},
    //                                       {label: 'London', value: '00002'}]]);
    
    // const [nations, setNations] = useState([[{label: 'UK', value: '001'},
    //                                         {label: 'CN', value: '002'}]])
    const [selectedCity, setSelectedCity] = useState(['00001']);
    const [selectedNation, setSelectedNation] = useState(['001']);
    const [times, setTimes] = useState('times');
    const [dateShow, setDateShow] = useState(false);


    useEffect(() => {

    }, []);

    const handleCityChange = (value) => {
        setSelectedCity(value);
    }

    const handleNationChange = (value) => {
        setSelectedNation(value);
    }

    const handleDate = () => {
        setDateShow(!dateShow);
    }

    const handleDateConfirm = (startTime, endTime) => {
        handleDate();
        setTimes(dayjs(startTime).format('YYYY-MM-DD') + "~" + 
        dayjs(endTime).format('YYYY-MM-DD'));
    }

    return (
        <div className='search'>
            <div className='search-addr'>
                <div className='search-addr-nation'>
                    {!props.citiesLoading && <Picker
                        title='nation'
                        data={[props.nations]}
                        value={selectedNation}
                        cascade={false}
                        cols={1}
                        onChange={handleNationChange}
                    >
                        <List.Item>choose nation</List.Item>
                    </Picker>}
                </div>
                <div className='search-addr-city'>
                    {!props.nationsLoading && <Picker
                        title='city'
                        data={[props.cities]}
                        value={selectedCity}
                        cascade={false}
                        cols={1}
                        onChange={handleCityChange}
                    >
                        <List.Item>choose city</List.Item>
                    </Picker>}
                </div>
            </div>
            <div className='search-time' onClick={handleDate}>
                    <p className='search-time_left'>scheduled departure time</p>
                    <p className='search-time_right'>{times}</p>
            </div>
            <Button type="warning" size='large'>Search</Button>
            <Calendar
                visible={dateShow}
                onCancel={handleDate}
                onConfirm={handleDateConfirm}
                >
            </Calendar>

        </div>
    )
}


