import React from 'react'
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';
import {cities, citiesLoading, nations, nationsLoading, groups} from '../../mock/home';
import './index.scss';

export default function Home() {


    // const [cities, citiesLoading] = useHttpHook({
    //     url: './commons/citys'
    // })

    
    // const [nations, nationsLoading] = useHttpHook({
    //     url: './commons/nations'
    // })


    return (
        <div className='home'>
            <Header />
            <Search 
                cities={cities}
                citiesLoading={citiesLoading}
                nations={nations}
                nationsLoading={nationsLoading}/> 
            <Hot groups={groups}/>
        </div>
    )
}
