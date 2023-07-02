/**
 *      FRAMEWORK
 */

import React, { Suspense, useEffect, useState } from 'react'
/**
 *      FRAMEWORK - NEXT
 */
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

/**
 *      COMPONENTS
 */

const HomeWithoutSSR = dynamic(() => import('../components/LoadingScene'), {
  ssr: false,
})


const Index: NextPage = ({}) => {


  return (
    <>
    
      <HomeWithoutSSR  />
      
    </>
  )
}

export default Index
