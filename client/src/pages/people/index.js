import React, { useState, useEffect } from 'react';
import Banner from './components/banner';
import Info from './components/info';
import List from './components/lists';
import Footer from './components/footer';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enum';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getDetailAsync, getCommentsAsync, resetData, reloadComments } from '@/redux/actions/people';
import { useHistory, useLocation } from 'react-router-dom';
import './index.scss';


export default function People() {

  const selector = state => ({
    detail: state.people.detail,
    comments: state.people.comments,
    page: state.people.page,
    showLoading: state.people.showLoading,
    reloadCommentsNum: state.people.reloadCommentsNum
  });

  const { detail, comments, page, reloadCommentsNum, showLoading } = useSelector(selector, shallowEqual);

  const dispatch = useDispatch();

  const history = useHistory();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [userId, setUserId] = useState(query?.get('id'));

  useEffect(() => {
    history.listen(route => {
      const jump = new URLSearchParams(route.search);
      setUserId(jump?.get('id'));
    })
  }, [])

 useEffect(() => {
  return () => {
    dispatch(resetData({}));
  }
  }, [userId]);

  useObserverHook('#' + CommonEnum.LONDING_ID, (entries) => {
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      dispatch(reloadComments({}));
    }
  }, [comments, showLoading]);

  useEffect(() => {
    dispatch(getDetailAsync({
      userId: userId
    }));
  }, [userId]);

  useEffect(() => {
    dispatch(getCommentsAsync({ page, comments }, {
      userId: userId
    }));
  }, [reloadCommentsNum, userId]);

  return (
    <div className='people-page'>
      <Banner />
      <Info detail={detail} />
      <List lists={comments} showLoading={showLoading}/>
      <Footer/>
    </div>
  )
}
