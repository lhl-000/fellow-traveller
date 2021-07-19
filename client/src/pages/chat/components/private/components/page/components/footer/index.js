import React from 'react'
import { InputItem } from 'antd-mobile';
import { BsReplyFill, BsOutlet, BsFillImageFill } from "react-icons/bs";
export default function Footer(props) {

    const {handleSubmit, setMessage, message} = props;

    const handleChange = (value) => {
        setMessage(value);
    }

    return (
        <div className='footer'>
            <div className='input-box'>
            <div className='function-bar'>
                <div className='bar-item'>
                    <BsOutlet size={20} /> 
                </div>
                <div className='bar-item'>
                    <BsFillImageFill size={20}/>
                </div>
                
            </div>
            <div>
                <InputItem className='input-line'
                    value={message}
                    placeholder='message'
                    onChange={handleChange}
                    extra={<BsReplyFill size={20} onClick={handleSubmit}/>}
                >  
                </InputItem>
            </div>
            </div>
        </div>
    )
}
