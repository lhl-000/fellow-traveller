import React, { useState, useEffect } from 'react'

export default function Hot() {

    const groups = [
        {
            title: "To bristol in September",
            info: ["Bristol", "September", "UK"],
            mumbers: 1000
        },
        {
            title: "To bristol in July",
            info: ["London", "July", "UK"],
            mumbers: 780
        }];

    useEffect(() => {

    }, [])

    return (
        <div className='hot'>
            <h1>hot group</h1>
            <div className='hot-lists'>
                    {groups.map(item => {
                        return(
                        <div className='hot-lists-item'>
                            <div className='title'>{item.title}</div>
                            <div className='info'>
                                {item.info.map(item => {
                                    return (<div className='info-tags'>{item}</div>) 
                                })}
                            </div>
                            <div className='mumbers'><span className='num'>&nbsp;&nbsp;&nbsp;&nbsp;{item.mumbers}</span> people are chatting now!</div>
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}
