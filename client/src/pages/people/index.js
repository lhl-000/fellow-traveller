import React, { useState, useEffect } from 'react'
import Banner from './components/banner';
import Info from './components/info';
import List from './components/lists';
import Footer from './components/footer';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enum';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getDetailAsync, getCommentsAsync, resetData, reloadComments } from '@/redux/actions/people';
import { useLocation } from 'react-router-dom';
import './index.scss';


export default function People() {

  const selector = state => ({
    detail: state.detail,
    comments: state.comments,
    page: state.page,
    showLoading: state.showLoading,
    reloadCommentsNum: state.reloadCommentsNum
  });

  const { detail, comments, page, reloadCommentsNum, showLoading } = useSelector(selector, shallowEqual);

  const dispatch = useDispatch();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  useObserverHook('#' + CommonEnum.LONDING_ID, (entries) => {
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      dispatch(reloadComments({}));
    }
  }, [comments, showLoading]);

  useEffect(() => {
    dispatch(getDetailAsync({
      id: query?.get('id')
    }));
  }, []);

  useEffect(() => {
    dispatch(getCommentsAsync({ page, comments }, {
      id: query?.get('id')
    }));
  }, [reloadCommentsNum]);

  useEffect(() => {
    return () => {
      dispatch(resetData({}));
    }
  }, []);

  return (
    <div className='people-page'>
      <Banner />
      <Info detail={detail} />
      <List lists={comments} showLoading={showLoading} />
      <Footer />
    </div>
  )
}
