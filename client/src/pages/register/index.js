import React,  {useState } from 'react';
import User from './components/user';
import Travel from './components/travel';
import { Button, Toast} from 'antd-mobile';
import dayjs from 'dayjs';
import { createForm } from 'rc-form';
import { registerAsync } from '@/redux/actions/user';
import { useDispatch} from 'react-redux';

import './index.scss';

function Register(props) {

    const dispatch = useDispatch();

    const { validateFields } = props.form;

    const [files, setFiles] = useState([]);
    const [selectedStartAdrr, setSelectedStartAdrr] = useState(['00000', '00001']);
    const [selectedDestinationAdrr, setSelectedDestinationAdrr] = useState(['10000', '10001']);
    const [selectedVehicle, setSelectedVehicle] = useState(['0']);
    const initTime = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const [times, setTimes] = useState(`${initTime}~${initTime}`);



    const handleSubmit = () => {
        validateFields((error, value) => {
          if (error) {
            Toast.fail('Please fill the information completely');
            return;
          } else {
            if (value.password && value.password.length < 8) {
              Toast.fail('The password must be larger than 8 dights');
              return;
            }
            if (value.password !== value.cfmPassword) {
              Toast.fail('The password and confirmed password must be the same');
              return;
            }
            if (value.meg && value.meg.length > 40) {
              Toast.fail('The message must be less than 40 dights');
              return;
            }
            dispatch(registerAsync({
              avater: files[0].url,
              meg: value.meg,
              password: value.password,
              startNation: selectedStartAdrr[0],
              startCity: selectedStartAdrr[1],
              destinationNation: selectedDestinationAdrr[0],
              destinationCity: selectedDestinationAdrr[1],
              vehicle : selectedVehicle,
              startTime: times.split('~')[0] + ' 0:0:0',
              endTime: times.split('~')[1] + ' 23:59:59',
            }
              , props.history));
          }
        });
      };
    
      const handleClick = () => {
        props.history.push('/login');
      };
  
      return (
        <div className='register-page'>
          <User
            form={props.form}
            data={{files, setFiles}}
          />
          <Travel
            form={props.form} 
            data={{selectedStartAdrr, 
              setSelectedStartAdrr,
              selectedDestinationAdrr,
              setSelectedDestinationAdrr,
              selectedVehicle,
              setSelectedVehicle,
              times,
              setTimes
            }}
          /> 
          <Button type='warning' onClick={handleSubmit}>Register</Button>
          <div className='login' onClick={handleClick}>Already have the account? Go to log in</div>
        </div>
      )
    }
    
export default createForm()(Register)
