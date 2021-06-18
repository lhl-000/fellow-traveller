import React, { useState, useEffect } from 'react'
import { useObserverHook } from '@/hooks';

export default function Observer(props) {
    const [state, setstate] = useState();
    
    const handleClick = () => {
        props.history.push('/')
    }

    useObserverHook('#loading', (entries) => {
        console.log(entries);
    })
//   
  
    return (
        <div>
            observer
            <button onClick={handleClick}>home</button>
            <div id='loading' style={{width:'100px', 
                                    height:'100px',
                                    background:'#f60',
                                    marginTop:'1000px'}}>
            loading
            </div>
        </div>
    )
}
