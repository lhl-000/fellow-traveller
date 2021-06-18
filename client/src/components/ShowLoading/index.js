import React, { useState, useEffect } from 'react'
import PropsTypes from 'prop-types';
import { CommonEnum } from '@/enum'
import './index.scss';

export default function ShowLoading(props) {

    return (
        <div>
            {props.showLoading 
                ? <div id={CommonEnum.LOADING_ID} className='loading-info'>loading</div> 
                : <div className='loading-info'>没有数据了~</div>}
        </div>
    )
}

ShowLoading.defalutProps ={
    showLoading: true
}

ShowLoading.PropsTypes ={
    showLoading: PropsTypes.bool
}