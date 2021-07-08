import { Toast } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import { base_url } from '../enum/common';
export default function Http({
  url,
  method = 'post',
  headers,
  body = {},
  setLoading,
  setResult,
}){
  setLoading && setLoading(true);

  const defaultHeader = {
    'Content-type': 'application/json'
  };

  let params;
  if(method.toUpperCase() === 'GET'){
    params = undefined;
  }else {
    params = {
      headers: {
        ...defaultHeader,
        headers
      },
      method,
      body: JSON.stringify(body)
    }
  }

  return new Promise((resolve, reject)=>{
    console.log(base_url + url, params);
    fetch(base_url + url, params)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.status === 200 && res.errMsg === null){
          resolve(res.data);
          setResult && setResult(res.data);
        }else {
          Toast.fail(res.errMsg);
          reject(res.errMsg);
        }
      })
      .catch(err => {
        Toast.fail(err);
        reject(err);
      })
      .finally(() => {
        setLoading && setLoading(false);
      })
  });
}