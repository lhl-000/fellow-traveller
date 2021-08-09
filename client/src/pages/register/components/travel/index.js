import React, { useState } from 'react';
import { Picker, List, Calendar, TextareaItem, Checkbox, InputItem, Toast } from 'antd-mobile'
import dayjs from 'dayjs';
import { district } from '@/asserts/district';
import { vehicle } from '@/asserts/vehicle';
import {BsFillPlusCircleFill, BsFillXCircleFill} from 'react-icons/bs';

export default function Travel(props) {

    const { getFieldProps} = props.form;

    const [dateShow, setDateShow] = useState(false);

    const [selectedTransforStatus, setSelectedTransforStatus] = useState([true, true, true, true])

    const {selectedStartAdrr, setSelectedStartAdrr,
      selectedDestinationAdrr, setSelectedDestinationAdrr,
      checkedVehicle,setSelectedVehicle,selectedVehicle,
      times, setTimes, 
      transfer1,
      transfer2,
      transfer3,
      transfer4, 
      setTransfer1,
      setTransfer2,
      setTransfer3,
      setTransfer4
    } = props.data;

    const handleStartChange = (value) => {
      setSelectedStartAdrr(value);
    }

    const handleDestinationChange = (value) => {
      setSelectedDestinationAdrr(value);
    }

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

    const handleDateConfirm = (startTime, endTime) => {
        handleDate();
        setTimes(dayjs(startTime).format('YYYY-MM-DD') + "~" +
            dayjs(endTime).format('YYYY-MM-DD'));
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
                      {/* <InputItem
                       value={selectedStartAdrr}
                       onChange={handleStartChange}
                       placeholder={"don't find place in above, input here"}
                      >
                      Start: 
                      </InputItem> */}
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
                    <p className='travel-time_left'>Depature time:</p>
                    <p className='travel-time_right'>{times}</p>
                  </div>
                  <div className='travel-vehicle'>
                    {/* <Picker
                      data={vehicle}
                      cols={1}
                      title='vehicle'
                      value={selectedVehicle}
                      cascade={true}
                      onChange={handleVehicleChange}
                    >
                      <List.Item>Favorite vehicle: </List.Item>
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
              <div className='travel-meg'>
                <TextareaItem
                    rows={2}
                      {...getFieldProps('meg', {
                        rules: [{ required: true }]
                      })}
                      placeholder='leave your sign'
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

