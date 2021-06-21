import React, { useState, useEffect } from 'react'
import {ShowLoading} from '@/components'
export default function Lists(props) { 

    const [state, setstate] = useState();
    
    return (
        <div className='comment'>
          <h1 className='comment-title'>Comment</h1>
          <div className='comment-lists'>
            <img src={''} alt='user' className='avatar'></img>
            <div className='right'>
            <div className='right-top'>
              <p>{'user'}</p>
              <p>{'time'}</p>
            </div>
            <div className='right-bottom'>
              {'info'}
            </div>
        </div>
        {/* {props?.lists?.map(item => (
          <div className='comment-lists_item' key={item?.id}>
            <img alt='user' className='avatar' src={item?.avatar} />
            <div className='right'>
              <div className='right-top'>
                <p>{item?.username}</p>
                <p>{timer(item?.createTime)}</p>
              </div>
              <div className='right-bottom'>
                {item?.info}
              </div>
            </div>
          </div>
        ))} */}
        <ShowLoading showLoading={props?.showLoading} />
      </div>
    </div>
    )
}