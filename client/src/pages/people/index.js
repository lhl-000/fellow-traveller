import React, { useState } from 'react'
import Banner from './components/banner';
import Info from './components/info';
import List from './components/lists';
import Footer from './components/footer';

import  './index.scss';

export default function People() {
    return (
        <div className='people-page'>
            <Banner />
            <Info />
            <List />
            <Footer />
        </div>
    )
}
