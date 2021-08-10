import React,  {useState, useEffect } from 'react';
import User from './components/user';
import Travel from './components/travel';
import { Button, Toast} from 'antd-mobile';
import dayjs from 'dayjs';
import { createForm } from 'rc-form';
import { registerAsync } from '@/redux/actions/user';
import { useDispatch} from 'react-redux';
import cookie from 'react-cookies';
import './index.scss';

import WebIM from '@/config/WebIM'



function Register(props) {

    const dispatch = useDispatch();

    const { validateFields } = props.form;

    const [files, setFiles] = useState([]);
    const [selectedStartAdrr, setSelectedStartAdrr] = useState([10000, 10001]);
    const [selectedDestinationAdrr, setSelectedDestinationAdrr] = useState([20000, 20001]);
    const [selectedVehicle, setSelectedVehicle] = useState(['none']);
    const [transfer1, setTransfer1] = useState([30000, 30001]);
    const [transfer2, setTransfer2] = useState([30000, 30001]);
    const [transfer3, setTransfer3] = useState([30000, 30001]);
    const [transfer4, setTransfer4] = useState([30000, 30001]);
    const initTime = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const [times, setTimes] = useState(`${initTime}~${initTime}`);
    const [selectedSex, setSelectedSex] = useState(['M'])
    const emailPatt = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    const usernamePatt = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$");
    const [checkedVehicle, setheckedVehicle] = useState(new Map())
    // var checkedVehicle = new Map();
    let userValue = null; 
    let conn = null;
    let qqPattern = /^[1-9][0-9]{4,10}$/;
    // 环信服务器注册
    const webIM_regiester = (username, password, nickname) => {
      return { 
        username: username,
        password: password,
        nickname: nickname,
        appKey: WebIM.config.appkey,
        success: function () {
          const loginOptions = webIM_login(userValue.username, userValue.password);
          conn.open(loginOptions);
          conn.listen({
            onOpened: function ( message ) { //连接成功回调
                // console.log(message);
            },  
            onClosed: function ( message ) {
                // console.log(message);
            },         //连接关闭回调
            onTextMessage: function ( message ) {
                // console.log(message);
            },    //收到文本消息 
            onError: function ( message ) {
                // Toast.fail("Failed to send message, try to refresh the page")
            },          //失败回调
            onReceivedMessage: function(message){
    
            },    //收到消息送达服务器回执
    }); 
    conn?.close();
         },  
        error: function (err) {
          Toast.fail("Fail to register, please try again")
            let errorData = JSON.parse(err.data);
            if (errorData.error === 'duplicate_unique_property_exists') {
                console.log('用户已存在！');
            } else if (errorData.error === 'illegal_argument') {
                if (errorData.error_description === 'USERNAME_TOO_LONG') {
                    console.log('用户名超过64个字节！')
                }else{
                    console.log('用户名不合法！')
                }
            } else if (errorData.error === 'unauthorized') {
                console.log('注册失败，无权限！')
            } else if (errorData.error === 'resource_limited') {
                console.log('您的App用户注册数量已达上限,请升级至企业版！')
            }
        }, 
      }; 
    }

    const webIM_login = (username, password) =>{
      return { 
          user: username,
          pwd: password,
          appKey: WebIM.config.appkey,
          success: function (res) {
            var token = res.access_token;
            cookie.save('im_token', token);
            const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            dispatch(registerAsync({
              username:userValue.username,
              password: userValue.password,
              email: userValue.email,
              userSex: selectedSex[0],
              avatar: files[0].url,
              qq:userValue.qq,
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
              meg: userValue.meg,
              startTime: times.split('~')[0] + ' 00:00:00',
              endTime: times.split('~')[1] + ' 23:59:59',
              userRegTime: currentTime,
              userModeTime: currentTime,
          }
            , props.history));
          },    
          error: function(){
            Toast.fail('fail to register');
          }  
        }
    }

    const handleSubmit = () => {
        validateFields((error, value) => {
          if (error) {
            Toast.fail('Please fill the information completely');
            return;
          } else {
            if (value.username.length > 64) {
              Toast.fail('The username is too long');
              return;
            }
            // if (checkedVehicle.size == 0) {
            //   Toast.fail('Please choose your perferred means of transport');
            //   return;
            // }
            if (!usernamePatt.test(value.usernmae)) {
              Toast.fail('The username has illegal characters');
              return;
            }
            if (value.password && value.password.length < 8) {
              Toast.fail('The password must be larger than 8 dights');
              return;
            }
            if (!qqPattern.test(value.qq) || value.qq.length != 0) {
              Toast.fail('The qq number must have right format or be empty');
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
            userValue = value;
            const options = webIM_regiester(value.username, value.password, value.username);
            conn = WebIM.conn;
            conn.registerUser(options).catch((e) => {});;   
          }
        });
      };

      const handleClick = () => {
        props.history.push('/login');
      };

      useEffect(() => {
        return () => {
          if (conn != null) {
            conn.close();
          }
        }
      }, [])
  
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
            data={{
              transfer1,
              transfer2,
              transfer3,
              transfer4,
              selectedStartAdrr, 
              setSelectedStartAdrr,
              selectedDestinationAdrr,
              setSelectedDestinationAdrr,
              selectedVehicle,
              setSelectedVehicle,
              checkedVehicle,
              times,
              setTimes,
              setTransfer1,
              setTransfer2,
              setTransfer3,
              setTransfer4
            }}
          /> 
          <Button type='warning' onClick={handleSubmit}>Register</Button>
          <div className='login' onClick={handleClick}>Already have the account? Go to log in</div>
        </div>
      )
    }
    
export default createForm()(Register)
