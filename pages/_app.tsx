
import type { AppProps } from 'next/app'
import React, { useRef } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import '../styles/Joystick.css'
const HomeWithoutSSR = dynamic(() => import('../components/LoadingScene'), {
  ssr: false,
})



function MyApp({ Component, pageProps }: AppProps) {
  const ref = useRef()
  return (
    <>
     
        <Component {...pageProps} />
   
    </>
  )
}



export default MyApp
