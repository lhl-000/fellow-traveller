import React from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
export default function Header(props) {

    return (
        <div className='header'>
            <div className='back'>
                <BsArrowLeftShort size={30}/>
            </div>
            <div className='name'>name</div>
        </div>
    )
}
