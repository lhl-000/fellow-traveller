import React from 'react'
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';
import { district } from '@/asserts/district';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';
import WebIM from '@/config/WebIM';
import './index.scss';


export default function Home() {

    const [people, peopleLoading] = useHttpHook({
        url: '/people/popular'
    });

    if (cookie.load('token') && cookie.load('im_token')) {
        const conn = WebIM.conn;
        conn.open({
            user: jwt_decode(cookie.load('token')).sub,
            accessToken: cookie.load('im_token'),
            appKey: WebIM.config.appkey,
        });
    }




    const districtLoading = false;

    return (
        <div className='home'>
            <Header />
            <Search 
                district={district}
                districtLoading={districtLoading}
                /> 
            <Hot people={people} peopleLoading={peopleLoading}/>
        </div>
    )
}
