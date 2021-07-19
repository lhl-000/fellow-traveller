import React from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { useHistory } from 'react-router-dom';


export default function Header(props) {

    const history = useHistory();
    const handleClick = () => {
        const target = props?.location?.state?.preUrl;
        if (target) {
            history.replace(target);
        } else {
            history.replace('/chat');
        }
    }
    return (
        <div className='header'> 
            <div className='back' onClick={handleClick}>
                <BsArrowLeftShort size={30}/>
            </div>
            <div className='name'>{props.name}</div>
        </div>
    )
}
