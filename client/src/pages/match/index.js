import React, { useState, useEffect } from 'react';
import Lists from './components/Lists';
import Header from './components/header';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enum';
import { Http } from '@/utils';
import cookie from 'react-cookies';
import jwt_decode from "jwt-decode";

import './index.scss';

export default function Match(props) {
    const [page, setPage] = useState(CommonEnum.PAGE);
    const [people, setPeople] = useState([]);
    const [showSkeletons, setShowSkeletons] = useState(true)
    const [showLoading, setShowLoading] = useState(true);
    const userId = jwt_decode(cookie.load('token')).jti;

    const invokeHttp = async (pageNum) => {
        const result = await Http({
          url: '/people/match',
          body: {
            userId: userId,
            ...page,
            pageNum,
          }
        });
        return result;
      };

      const fetchPeople = async (pageNum) => {
        const result = await invokeHttp(pageNum);
        if (result) {
          setPeople(result);
          setShowSkeletons(false);
          if (result.length === page.pageSize) {    
            setShowLoading(true);
            } else {
            setShowLoading(false);
            }
        } else {
          setShowLoading(false);
        }
      };

    useObserverHook('#' + CommonEnum.LONDING_ID , async (entries) => {
      // console.log(entries);
      if (entries[0].isIntersecting) {
        const result = await invokeHttp(page.pageNum + 1);
        if (people && people.length !== 0 && result && result.length === page.pageSize) {
          setPeople([...people, ...result]);
          setPage({
            ...page,
            pageNum: page.pageNum + 1
          });
          setShowLoading(true);
        }else {
          setPeople([...people, ...result]);
          setShowLoading(false);
        }
      }
    }, null);

    useEffect(() => {
      fetchPeople(1);
    }, [])

    return (
        <div className='match-page'>
          <Header/>
          <Lists people={people} showLoading={showLoading} showSkeletons={showSkeletons}/>
        </div>
    )
}
