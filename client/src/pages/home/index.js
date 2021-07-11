import React from 'react'
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';
import { district } from '@/asserts/district';
import './index.scss';

// import { people, peopleLoading } from '../../mock/people';
export default function Home() {

    const [people, peopleLoading] = useHttpHook({
        url: '/people/popular'
    });

    // const [district, districtLoading] = useHttpHook({
    //     url: '/commons/district'
    // })

    const districtLoading = false;

    return (
        <div className='home'>
            <Header />
            <Search 
                district={district}
                districtLoading={districtLoading}
                /> 
            {/* <Hot groups={groups}/> */}
            <Hot people={people} peopleLoading={peopleLoading}/>
        </div>
    )
}
