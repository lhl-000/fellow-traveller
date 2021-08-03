import React from 'react'
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import Footer from './components/footer';
import { useHttpHook } from '@/hooks';
import { district } from '@/asserts/district';

import './index.scss';


export default function Home() {

    const [people, peopleLoading] = useHttpHook({
        url: '/people/popular'
    });

    const districtLoading = false;

    return (
        <div className='home'>
            <Header />
            <Search 
                district={district}
                districtLoading={districtLoading}
                /> 
            <Hot people={people} peopleLoading={peopleLoading}/>
            <Footer/>
        </div>
    )
}
