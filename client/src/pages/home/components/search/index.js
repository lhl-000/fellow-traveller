import React, { useState, memo } from 'react'
import { LocaleProvider, Picker, List, Calendar, Button } from 'antd-mobile'
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

function Search(props) {

    const history = useHistory();
    const [selectedStartAdrr, setSelectedStartAdrr] = useState([10000, 10001]);
    const [selectedDestinationAdrr, setSelectedDestinationAdrr] = useState([20000, 20001]);

    const initTime = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const [times, setTimes] = useState(`${initTime}~${initTime}`);
    const [dateShow, setDateShow] = useState(false);

    const handleStartChange = (value) => {
        setSelectedStartAdrr(value);
    }

    const handleDestinationChange = (value) => {
        setSelectedDestinationAdrr(value)
    }

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
        history.push({
            pathname: '/search',
            search: `?startNation=${selectedStartAdrr[0]}&startCity=${selectedStartAdrr[1]}&destNation=${selectedDestinationAdrr[0]}&destCity=${selectedDestinationAdrr[1]}&startTime=${startTime}&endTime=${endTime}`
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
            <div className='search-time' onClick={handleDate}>
                <p className='search-time_left'>planned time</p>
                <p className='search-time_right'>{times}</p>
            </div>
            <Button type="warning" size='large' onClick={handleClick}>Search</Button>
            <LocaleProvider locale={enUS}>
            <Calendar
                visible={dateShow}
                onCancel={handleDate}
                onConfirm={handleDateConfirm}
            >
            </Calendar>
            </LocaleProvider>
        </div>
    )
}

function areEqule(prevProps, nextProps) {
    if (prevProps.district === nextProps.district 
        && prevProps.districtLoading === nextProps.districtLoading) {
            return true;
        }
    return false;
}

export default memo(Search, areEqule);
