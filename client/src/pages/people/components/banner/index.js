import React from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { useHistory } from 'react-router-dom';

export default function Banner(props) { 

    const history = useHistory();
    const handleClick = () =>{
        history.goBack();
    }

    return (
        <div className='banner'>
            <div className='back' onClick={handleClick}>
                <BsArrowLeftShort size={40}/>
            </div>
            <div className='img'></div>
        </div>
    )
}
