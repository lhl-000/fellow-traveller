import React, { useState, useEffect } from 'react';
import { Modal } from '@/components';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { addCommentsAsync } from '@/redux/actions/people'
import { useDispatch } from 'react-redux';

export default function (props) {

  const [show, setShow] = useState(false);

  const [commentsValue, setCommentsValue] = useState();

  const dispatch = useDispatch();

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
    if(commentsValue){
      handleClose();
      dispatch(addCommentsAsync({
        comment: commentsValue
      }));
    }else {
      Toast.fail('Please add more message');
    }
  };

  useEffect(() => {

  }, [])

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