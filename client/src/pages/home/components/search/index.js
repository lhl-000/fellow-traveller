import React, { useState, useEffect } from 'react'
import { Picker, List, Calendar, Button } from 'antd-mobile'
import dayjs from 'dayjs'
import { withRouter } from 'react-router-dom'

function Search(props) {

    // const [selectedCity, setSelectedCity] = useState(['00001']);
    // const [selectedNation, setSelectedNation] = useState(['001']);
    const [selectedStartAdrr, setSelectedStartAdrr] = useState(['00000', '00001']);
    const [selectedDestinationAdrr, setSelectedDestinationAdrr] = useState(['10000', '10001']);

    const initTime = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const [times, setTimes] = useState(`${initTime}~${initTime}`);
    const [dateShow, setDateShow] = useState(false);

    useEffect(() => {

    }, []);

    const handleStartChange = (value) => {
        setSelectedStartAdrr(value);
    }

    const handleDestinationChange = (value) => {
        setSelectedDestinationAdrr(value)
    }

    // const handleCityChange = (value) => {
    //     setSelectedCity(value);
    // }

    // const handleNationChange = (value) => {
    //     setSelectedNation(value);
    // }

    const handleDate = () => {
        setDateShow(!dateShow);
    }

    const handleDateConfirm = (startTime, endTime) => {
        handleDate();
        setTimes(dayjs(startTime).format('YYYY-MM-DD') + "~" + 
        dayjs(endTime).format('YYYY-MM-DD'));
    }

    const handleClick = () => {
        const startTime = times.split('~')[0];
        const endTime = times.split('~')[1];
        props.history.push({
            pathname : '/search',
            search : `?startNation=${selectedStartAdrr[0]}&startCity=${selectedStartAdrr[1]}&destinationNation=${selectedDestinationAdrr[0]}&destinationCity=${selectedDestinationAdrr[1]}&stratTime=${startTime}&endTime=${endTime}`
        })
    }

    return (
        <div className='search'>
            {!props.districtLoading &&
            <div className='search-addr'>           
                <div className='search-addr-start'>
                    <Picker
                        data={props.district}
                        title="Areas"
                        value={selectedStartAdrr}
                        cascade={true}
                        onChange={handleStartChange}
                    >
                        <List.Item>Start: </List.Item>
                    </Picker>
                </div>
                <div className='search-addr-destination'>
                    <Picker
                        data={props.district}
                        title="Areas"
                        value={selectedDestinationAdrr}
                        cascade={true}
                        onChange={handleDestinationChange}
                    >
                        <List.Item>destination: </List.Item>
                    </Picker>
                </div>
             </div>
            }
                {/* <div className='search-addr-nation'>
                    {!props.citiesLoading && <Picker
                        title='nation'
                        data={[props.nations]}
                        value={selectedNation}
                        cascade={false}
                        cols={1}
                        onChange={handleNationChange}
                    >
                        <List.Item>nation</List.Item>
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
                        <List.Item>city</List.Item>
                    </Picker>}
                </div> */}
            <div className='search-time' onClick={handleDate}>
                    <p className='search-time_left'>planned time</p>
                    <p className='search-time_right'>{times}</p>
            </div>
            <Button type="warning" size='large' onClick={handleClick}>Search</Button>
            <Calendar
                visible={dateShow}
                onCancel={handleDate}
                onConfirm={handleDateConfirm}
                >
            </Calendar>

        </div>
    )
}

export default withRouter(Search);


