import React, { useState, useEffect } from 'react'
import {ShowLoading} from '@/components';
import { timer } from '@/utils';

export default function Lists(props) { 

    return (
         <div className='comment'>
           <h1 className='comment-title'>Comment</h1>
           <div className='comment-lists'>
              {props?.lists?.map(item => (
                <div className='comment-lists-item' key={item?.id}>
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
              ))}
        <ShowLoading showLoading={props?.showLoading} />
      </div>
    </div>
    )
}