import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, Calendar,TextareaItem, Button, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { editUserAsync } from '@/redux/actions/user';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import dayjs from 'dayjs';
import { district } from '@/asserts/district';
import { vehicle } from '@/asserts/vehicle';

import './index.scss';

function Edit(props) {

    const selector = (state) => ({
        avatar: state.user.avatar,
        meg: state.user.meg,
        startNation: state.user.startNation,
        startCity: state.user.startCity,
        destinationNation: state.user.destinationNation,
        destinationCity: state.user.destinationCity,
        defaultVehicle : state.user.vehicle,
        startTime: state.user.startTime,
        endTime: state.user.endTime
    }); 

    const [files, setFiles] = useState([]);
    const { getFieldProps, validateFields } = props.form;
    
    const dispatch = useDispatch();

    const { avatar, meg, startNation, startCity, destinationNation,
        destinationCity, defaultVehicle, startTime, endTime} = useSelector(selector, shallowEqual);

    const [selectedStartAdrr, setSelectedStartAdrr] = useState([startNation, startCity]);
    const [selectedDestinationAdrr, setSelectedDestinationAdrr] = useState([destinationNation, destinationCity]);
    const [selectedVehicle, setSelectedVehicle] = useState([defaultVehicle]);
    const [times, setTimes] = useState(`${startTime}~${endTime}`);
    const [dateShow, setDateShow] = useState(false);

    const handleChange = (files) => {
        if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
            Toast.fail('Picture size should less than 0.5M');
            return;
        }
        setFiles(files);
    };

    const handleSubmit = () => {
        if (!files.length) {
            setFiles(avatar);
            return;
        }
        validateFields((error, value) => {
            if (error) {
                Toast.fail('Please complete message');
                return;
            } else {
                if (value.meg && value.meg.length > 40) {
                    Toast.fail('The message must be less than 40 dights');
                    return;
                  } 
                dispatch(editUserAsync({
                    avater: files[0].url,
                    meg: value.meg,
                    startNation: selectedStartAdrr[0],
                    startCity: selectedStartAdrr[1],
                    destinationNation: selectedDestinationAdrr[0],
                    destinationCity: selectedDestinationAdrr[1],
                    vehicle : selectedVehicle,
                    startTime: times.split('~')[0] + ' 0:0:0',
                    endTime: times.split('~')[1] + ' 23:59:59',
                }, props.history));
            }
        });
    };

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
        <div className='user-edit'>
            <List>
                <List.Item>
                    <ImagePicker
                        files={files}
                        selectable={files.length < 1}
                        onChange={handleChange}
                    />
                </List.Item>
            </List>
            <List
              renderHeader={() => 'Travel information'}>
                  <div className='user-edit-addr-start'>
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
                  <div className='user-edit-addr-destination'>
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
                  <div className='user-edit-time' onClick={handleDate}>
                    <p className='user-edit-time_left'>Planned time:</p>
                    <p className='user-edit-time_right'>{times}</p>
                  </div>
                  <div className='user-edit-vehicle'>
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
              renderHeader={() => 'Message board'}>
              <div className='user-edit-meg'>
                <TextareaItem
                    rows={2}
                    defaultValue={meg}
                      {...getFieldProps('meg', {
                        rules: [{ required: true },]
                      })}
                    >
                    Message:
                 </TextareaItem>
              </div>
            </List>
            <Calendar
                visible={dateShow}
                onCancel={handleDate}
                onConfirm={handleDateConfirm}
            >
            </Calendar>
            <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>Edit</Button>
        </div>
    )
}

export default createForm()(Edit);