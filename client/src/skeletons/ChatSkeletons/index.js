import React, { useState, useEffect } from 'react';

import './index.scss';

export default function ChatSkeletons(props) {

  const [state, setState] = useState(Array(3).fill(1));

  useEffect(() => {

  }, [])

  return (
    <div className='chat-skeletons'>
      {state.map(item => (
        <div className='chat-item' key={item}>
          <div className={'skeletons left'}></div>
          <div className='center'>
            <div className={'skeletons item1'}></div>
            <div className={'skeletons item2'}></div>
            <div className={'skeletons item3'}></div>
          </div>
          <div className={'skeletons bottom'}>
          </div>
        </div>
      ))}
    </div>
  )
}