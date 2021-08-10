import React, { useState, useEffect } from 'react'
import { List, InputItem, Toast } from 'antd-mobile';
import { BsReplyFill, BsOutlet, BsFillImageFill } from "react-icons/bs";
export default function Footer(props) {

    const {handleSubmit, setMessage, message} = props;

    const handleChange = (value) => {
        setMessage(value);
    }

    const handleKeyup = (e) => {
        if(e.keyCode === 13) {
            handleSubmit();
        }
    }

    const handlePicture = () => {
        Toast.info("Please send picture by qq chat",1);
    }

    return (
        <div className='footer'>
            <div className='input-box'>
            <div className='function-bar' onClick={handlePicture}>
                <div className='bar-item'>
                    <BsOutlet size={20} /> 
                </div>
                <div className='bar-item'>
                    <BsFillImageFill size={20}/>
                </div>
                
            </div>
            <div>
                <List>
                <InputItem className='input-line'
                    value={message}
                    placeholder='message'
                    onChange={handleChange}
                    extra={<BsReplyFill size={20} onClick={handleSubmit}
                    />}
                    onKeyUp={handleKeyup}
                >  
                </InputItem>
                </List>
            </div>
            </div>
        </div>
    )
}
