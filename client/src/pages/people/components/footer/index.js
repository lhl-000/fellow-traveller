import React, { useState } from 'react';
import { Modal } from '@/components';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { addCommentsAsync } from '@/redux/actions/people'
import { useDispatch } from 'react-redux';
import cookie from 'react-cookies';
import jwt_decode from "jwt-decode";
import { useLocation } from 'react-router-dom';
export default function (props) {

  const [show, setShow] = useState(false);

  const [commentsValue, setCommentsValue] = useState();

  const dispatch = useDispatch();

  const { search } = useLocation();

  const handleClick = () => {
    setShow(true)
  };

  const handleChange = (value) => {
    setCommentsValue(value);
  };

  const handleClose = () => {
    setShow(false)
  };

  const handleSubmit = () => {
    if (!cookie.load('token')) {
        handleClose();
        Toast.fail("Please login fristly");
        return; 
    }
    if(commentsValue){
      handleClose();
      const query = new URLSearchParams(search); 
      dispatch(addCommentsAsync({
        userId: query?.get('id'),
        info: commentsValue,
        commenterId: jwt_decode(cookie.load('token')).jti,
        createTime: new Date().getTime(),
        avatar:null
      }));
    }else {
      Toast.fail('Please add more message');
    }
  };

  return (
    <>
      <div className='footer' onClick={handleClick}>
        Comment here~
      </div>
      <Modal
        show={show}
        styleBody={{
          height: '220px',
          bottom: '0px',
          top: 'unset'
        }}
        onClose={handleClose}
      >
        <div className='modal-comment'>
          <TextareaItem
            rows={2}
            count={200}
            onChange={handleChange}
          />
          <Button className='comment-btn' type='warning' onClick={handleSubmit}>Comment</Button>
        </div>
      </Modal>
    </>
  )
}