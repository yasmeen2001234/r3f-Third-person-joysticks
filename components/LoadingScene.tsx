import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Realtime } from 'ably/promises';
import Ably from 'ably/promises';

const Game = dynamic(() => import('./MainScene'), {
  ssr: false,
});



const Home = () => {
  return (
    <div className='App'>
      <>
        {/*@ts-ignore*/}
        <Game />
       
        {/* Need this for nipplesjs / joysticks */}
        <div id='joystickWrapper0'>
          <div id='mobileInterface' className='noSelect'>
            <div id='joystickWrapper1'></div>

            <div style={{ height: '100vh', width: '100%' }} />
          </div>
        </div>
        {/* <Notes /> */}
      </>
    </div>
  );
};

export default Home;
