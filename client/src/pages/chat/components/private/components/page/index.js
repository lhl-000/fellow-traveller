import React, { useState, useEffect } from 'react'
import { Toast} from 'antd-mobile';
import Footer from './components/footer';
import Header from './components/header';
import './index.scss';
export default function Page() {
    const [message, setMessage] = useState('');

     

    const handleSubmit = () => {
        if (message == '') {
            Toast.fail('message cannot be empty')
        }
    }

    return (
       <div className='private-chat-page'>
           <Header />
           <Footer
                handleSubmit={handleSubmit}
                setMessage={setMessage}
           ></Footer>
       </div>
    )
}
