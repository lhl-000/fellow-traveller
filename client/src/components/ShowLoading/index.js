import React from 'react'
import PropsTypes from 'prop-types';
import { CommonEnum } from '@/enum'
import './index.scss';

export default function ShowLoading(props) {

    return (
        <div>
            {props.showLoading 
                ? <div id={CommonEnum.LONDING_ID} className='loading-info'>loading</div> 
                : <div className='loading-info'>No more data~</div>}
        </div>
    )
}

ShowLoading.defalutProps ={
    showLoading: true
}

ShowLoading.PropsTypes ={
    showLoading: PropsTypes.bool
}