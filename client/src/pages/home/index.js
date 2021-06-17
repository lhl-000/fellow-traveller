import React from 'react'
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';

import './index.scss';

import {district, districtLoading} from '../../mock/home';
import { people, peopleLoading } from '../../mock/people';
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
                // cities={cities}
                // citiesLoading={citiesLoading}
                // nations={nations}
                // nationsLoading={nationsLoading}
                district={district}
                districtLoading={districtLoading}
                /> 
            {/* <Hot groups={groups}/> */}
            <Hot people={people} peopleLoading={peopleLoading}/>
        </div>
    )
}
