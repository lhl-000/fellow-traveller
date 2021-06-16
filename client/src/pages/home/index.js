import React from 'react'
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';

import './index.scss';

export default function Home() {
    return (
        <div className='home'>
            <Header />
            <Search /> 
            <Hot />
        </div>
    )
}
