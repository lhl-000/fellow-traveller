import React, { useState, useEffect } from 'react';
import Lists from './components/Lists';
import Header from './components/header';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enum';
import { Http } from '@/utils';
import cookie from 'react-cookies';

import './index.scss';

export default function Match(props) {
    const [page, setPage] = useState(CommonEnum.PAGE);
    const [people, setPeople] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const id = cookie.load('user').id;

    const invokeHttp = async (pageNum) => {
        const result = await Http({
          url: '/match/lists',
          body: {
            id: id,
            ...page,
            pageNum,
          }
        });
        return result;
      };

      const fetchPeople = async (pageNum) => {
        const result = await invokeHttp(pageNum);
        if (result && result.length === page.pageSize) {
          setPeople(result);
          setShowLoading(true);
        } else {
          setShowLoading(false);
        }
      };

    useObserverHook('#' + CommonEnum.LONDING_ID , async (entries) => {
      if (entries[0].isIntersecting) {
        const result = await invokeHttp(page.pageNum + 1);
        if (people && people.length != 0 && result && result.length === page.pageSize) {
          setPeople([...people, ...result]);
          setPage({
            ...page,
            pageNum: page.pageNum + 1
          });
          setShowLoading(true);
        }else {
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
          <Lists people={people} showLoading={showLoading}/>
        </div>
    )
}
