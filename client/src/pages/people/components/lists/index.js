
import React from 'react'
import {ShowLoading} from '@/components';
import { timer } from '@/utils';
import { useHistory } from 'react-router-dom';

export default function Lists(props) { 

  const history = useHistory();
  const handleClick = (value) =>{
    history.push({
      pathname: '/people',
      search: `?id=${value}`
  })
      // window.scrollTo(0,0)
      // window.location.reload();
  }

    return (
         <div className='comment'>
           <h1 className='comment-title'>Comment</h1>
           <div className='comment-lists'>
              {props?.lists?.sort((a, b)=>{
                return parseInt(b.createTime) - parseInt(a.createTime)
              }).map(item => (
                <div className='comment-lists-item' key={item?.createTime+item.userId} onClick={()=>handleClick(item.commenterId)}>
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
          </div>
          <ShowLoading showLoading={props?.showLoading} />

    </div>
    )
}