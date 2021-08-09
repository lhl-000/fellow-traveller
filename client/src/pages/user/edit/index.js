import React, { useState } from 'react';
import { List, ImagePicker, Toast, Calendar,TextareaItem, Button, Picker,Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
import { editUserAsync } from '@/redux/actions/user';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import dayjs from 'dayjs';
import { district } from '@/asserts/district';
import { vehicle } from '@/asserts/vehicle';
import {BsFillPlusCircleFill, BsFillXCircleFill} from 'react-icons/bs';
import { BsArrowLeftShort } from "react-icons/bs";
import cookie from 'react-cookies';
import jwt_decode from "jwt-decode";

import './index.scss';
import { useHistory } from 'react-router-dom';

function Edit(props) {

    const selector = (state) => ({
        avatar: state.user.avatar,
        meg: state.user.meg,
        startNation: state.user.startNation,
        startCity: state.user.startCity,
        destinationNation: state.user.destNation,
        destinationCity: state.user.destCity,
        defaultVehicle : state.user.perfVehicle,
        startTime: state.user.startTime,
        endTime: state.user.endTime
    }); 

    const { getFieldProps, validateFields } = props.form;
    
    const dispatch = useDispatch();

    const history = useHistory();


    const handleClick = () =>{
        history.goBack();
    }

    const { meg, startNation, startCity, destinationNation,
        destinationCity, defaultVehicle, startTime, endTime} = useSelector(selector, shallowEqual);
    const [files, setFiles] = useState([]);
    const [selectedStartAdrr, setSelectedStartAdrr] = useState([startNation, startCity]);
    const [selectedDestinationAdrr, setSelectedDestinationAdrr] = useState([destinationNation, destinationCity]);
    const [selectedVehicle, setSelectedVehicle] = useState([defaultVehicle]);
    const [times, setTimes] = useState(`${startTime}~${endTime}`);
    const [dateShow, setDateShow] = useState(false);
    const [transfer1, setTransfer1] = useState([30000, 30001]);
    const [transfer2, setTransfer2] = useState([30000, 30001]);
    const [transfer3, setTransfer3] = useState([30000, 30001]);
    const [transfer4, setTransfer4] = useState([30000, 30001]);
    const [checkedVehicle, setcheckedVehicle] = useState(new Map())
    const [selectedTransforStatus, setSelectedTransforStatus] = useState([true, true, true, true])

    const username = jwt_decode(cookie.load('token')).sub;

    const handleChange = (files) => {
        if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
            Toast.fail('Picture size should less than 0.5M');
            return;
        }
        setFiles(files);
    };

    const handleTransfer1Change = (value) => {
        setTransfer1(value)
      }
      const handleTransfer2Change = (value) => {
        setTransfer2(value)
      }
      const handleTransfer3Change = (value) => {
        setTransfer3(value)
      }
      const handleTransfer4Change = (value) => {
        setTransfer4(value)
      }

    const handleSubmit = () => {
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
                    username: username,
                    avatar: files[0]?.url,
                    meg: value.meg,
                    startNation: selectedStartAdrr[0],
                    startCity: selectedStartAdrr[1],
                    destNation: selectedDestinationAdrr[0],
                    destCity: selectedDestinationAdrr[1],
                    transfer1Nation:transfer1[0],
                    transfer1City:transfer1[1],
                    transfer2Nation:transfer2[0],
                    transfer2City:transfer2[1],
                    transfer3Nation:transfer3[0],
                    transfer3City:transfer3[1],
                    transfer4Nation:transfer4[0],
                    transfer4City:transfer4[1],
                    perfVehicle : selectedVehicle,
                    startTime: times.split('~')[0] + ' 00:00:00',
                    endTime: times.split('~')[1] + ' 23:59:59',
                    userModeTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
        if (checkedVehicle.has(value)) {
          checkedVehicle.delete(value);
        } else {
          checkedVehicle.set(value, value);
        }
        let str = '';
        checkedVehicle.forEach((item, key, mapObj) => {
          str+=item+ ' ';
        })
        setSelectedVehicle(str);
      }

      const handleAddTransfer = () => {
        let i = 0;
        for(i=0; i<=3;i++) {
          if (selectedTransforStatus[i]==true) {
            selectedTransforStatus[i] = false;
            
            setSelectedTransforStatus(selectedTransforStatus.slice());
            return;
          }
        }
          Toast.fail("it supports up to 4 transfer stations now");
      }
  
      const handleDeleteTransfer = () => {
        for(let i=3; i>=0;i--) {
          if (selectedTransforStatus[i]==false) {
            selectedTransforStatus[i] = true;
            setSelectedTransforStatus(selectedTransforStatus.slice())
            switch (i) {
              case 0:
                setTransfer1([30000, 30001]);
                break;
                case 1:
                  setTransfer2([30000, 30001]);
                  break;
                case 2:
                  setTransfer3([30000, 30001]);
                  break; 
                case 3:
                  setTransfer4([30000, 30001]);
                  break;
              default:
                break;
            }
            return;
          }
        }
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
                  <List.Item>
                  Transfer station:&nbsp;&nbsp;<BsFillPlusCircleFill onClick={handleAddTransfer}
                  />&nbsp;&nbsp;
                  <BsFillXCircleFill onClick={handleDeleteTransfer}/>
                  </List.Item>
                  <div className='travel-addr-transfer1' hidden={selectedTransforStatus[0]}>
                      <Picker
                          data={district}
                          title="Areas"
                          value={transfer1}
                          cascade={true}
                          onChange={handleTransfer1Change}
                      >
                          <List.Item>No.1 Transfer station: </List.Item>
                      </Picker>
                  </div>
                  <div className='travel-addr-transfer2' hidden={selectedTransforStatus[1]}>
                      <Picker
                          data={district}
                          title="Areas"
                          value={transfer2}
                          cascade={true}
                          onChange={handleTransfer2Change}
                      >
                          <List.Item>No.2 Transfer station: </List.Item>
                      </Picker>
                  </div>
                  <div className='travel-addr-transfer3' hidden={selectedTransforStatus[2]}>
                      <Picker
                          data={district}
                          title="Areas"
                          value={transfer3}
                          cascade={true}
                          onChange={handleTransfer3Change}
                      >
                          <List.Item>No.3 Transfer station: </List.Item>
                      </Picker>
                  </div>
                  <div className='travel-addr-transfer4' hidden={selectedTransforStatus[3]}>
                      <Picker
                          data={district}
                          title="Areas"
                          value={transfer4}
                          cascade={true}
                          onChange={handleTransfer4Change}
                      >
                          <List.Item>No.4 Transfer station: </List.Item>
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
                    <p className='user-edit-time_left'>Depature time:</p>
                    <p className='user-edit-time_right'>{times}</p>
                  </div>
                  <div className='user-edit-vehicle'>
                    {/* <Picker
                      data={vehicle}
                      cols={1}
                      title='vehicle'
                      value={selectedVehicle}
                      cascade={true}
                      onChange={handleVehicleChange}
                    >
                      <List.Item>Preferred vehicle: </List.Item>
                    </Picker> */}
                    <List.Item>Perferred means of transport: </List.Item>
                    {vehicle.map(i => (
          <Checkbox.CheckboxItem key={i.value} onChange={()=>handleVehicleChange(i.value)}>
            {i.label}
          </Checkbox.CheckboxItem>
        ))}
                  </div>
            </List>
            <List 
              renderHeader={() => 'Sign'}>
              <div className='user-edit-meg'>
                <TextareaItem
                    rows={2}
                    defaultValue={meg}
                    placeholder={meg}
                      {...getFieldProps('meg', {
                        rules: [],
                      })}
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
            <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>Edit</Button>
            <Button type='warning' style={{ marginTop: '20px' }} onClick={handleClick}>Back</Button>
        </div>
    )
}

export default createForm()(Edit);