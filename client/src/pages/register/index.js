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
    const [selectedSex, setSelectedSex] = useState(['M'])

    const emailPatt = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
;

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
            if (value.email && !emailPatt.test(value.email)) {
              Toast.fail('The email format is incorrect');
              return
            }
            const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            dispatch(registerAsync({
                username:value.username,
                password: value.password,
                email: value.email, 
                userSex: selectedSex[0],
                avatar: files[0].url,
                startNation: selectedStartAdrr[0],
                startCity: selectedStartAdrr[1],
                destNation: selectedDestinationAdrr[0],
                destCity: selectedDestinationAdrr[1],
                perfVehicle : selectedVehicle[0],
                meg: value.meg,             
                startTime: times.split('~')[0] + ' 00:00:00',
                endTime: times.split('~')[1] + ' 23:59:59',
                userRegTime: currentTime,
                userModeTime: currentTime,
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
            data={{files,
              setFiles,
              selectedSex,
              setSelectedSex}}
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
