import '../styles/globals.css'
import '../public/plugins/font-awesome/css/all.min.css';
import NProgress, { set }  from 'nprogress';
import 'nprogress/nprogress.css'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Loading from './loading';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(true);

  Router.events.on('routeChangeStart', ()=>{
    setLoading(true);
    NProgress.start();
  })

  Router.events.on('routeChangeComplete', ()=>{
    NProgress.done();
  })

  Router.events.on('beforeHistoryChange', ()=>{
    setLoading(true);
    NProgress.start();
  })

  Router.events.on('routeChangeError', ()=>{
    setLoading(true);
    NProgress.start();
  })

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  })


  return (
  <>

  {
    loading ? (
      <Loading/>
    ) : (
      <Component {...pageProps} />
    )
  }
  
  </>) 
}

export default MyApp
