
import type { AppProps } from 'next/app'
import React, { useRef, Component } from 'react'
import '../styles/Joystick.css'
import '../styles/globals.css'
// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }



function SafeHydrate({ children }: any) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
}

function MyApp({ Component, pageProps }: AppProps) {
  const ref = useRef()
  return (
    <>
  
        <Component {...pageProps} />
   
    </>
  )
}



export default MyApp
