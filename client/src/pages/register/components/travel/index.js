import React, { useState } from 'react';
import { Picker, List, Calendar, TextareaItem } from 'antd-mobile'
import dayjs from 'dayjs';
import { district } from '@/asserts/district';
import { vehicle } from '@/asserts/vehicle';

export default function Travel(props) {

    const { getFieldProps} = props.form;

    const [dateShow, setDateShow] = useState(false);

    const {selectedStartAdrr, setSelectedStartAdrr,
      selectedDestinationAdrr, setSelectedDestinationAdrr,
      selectedVehicle, setSelectedVehicle,
      times, setTimes
    } = props.data;


    const handleStartChange = (value) => {
      setSelectedStartAdrr(value);
    }

    const handleDestinationChange = (value) => {
      setSelectedDestinationAdrr(value);
    }

    const handleDate = () => {
      setDateShow(!dateShow);
  }

    const handleVehicleChange = (value) => {
      setSelectedVehicle(value);
    }

    const handleDateConfirm = (startTime, endTime) => {
        handleDate();
        setTimes(dayjs(startTime).format('YYYY-MM-DD') + "~" +
            dayjs(endTime).format('YYYY-MM-DD'));
    }



    return (
        <div className='travel'>
            <List
              renderHeader={() => 'Travel information'}>
                  <div className='travel-addr-start'>
                      <Picker
                          data={district}
                          title="Areas"
                          value={selectedStartAdrr}
                          cascade={true}
                          onChange={handleStartChange}
                      >
                          <List.Item>Start: </List.Item>
                      </Picker>
                  </div>
                  <div className='travel-addr-destination'>
                      <Picker
                          data={district}
                          title="Areas"
                          value={selectedDestinationAdrr}
                          cascade={true}
                          onChange={handleDestinationChange}
                      >
                          <List.Item>Destination: </List.Item>
                      </Picker>
                  </div>
                  <div className='travel-time' onClick={handleDate}>
                    <p className='travel-time_left'>Planned time:</p>
                    <p className='travel-time_right'>{times}</p>
                  </div>
                  <div className='travel-vehicle'>
                    <Picker
                      data={vehicle}
                      cols={1}
                      title='vehicle'
                      value={selectedVehicle}
                      cascade={true}
                      onChange={handleVehicleChange}
                    >
                      <List.Item>Preferred vehicle: </List.Item>
                    </Picker>
                  </div>
            </List>
            <List 
              renderHeader={() => 'Sign'}>
              <div className='travel-meg'>
                <TextareaItem
                    rows={2}
                      {...getFieldProps('meg', {
                        rules: [{ required: true }]
                      })}
                      placeholder='leave your  sign'
                    >
                    Sign:
                 </TextareaItem>
              </div>
            </List>
            <Calendar
                visible={dateShow}
                onCancel={handleDate}
                onConfirm={handleDateConfirm}
            >
            </Calendar>
        </div>
    )
}

