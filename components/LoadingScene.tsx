import React, { useEffect } from 'react'

import dynamic from 'next/dynamic'

const Game = dynamic(() => import('./MainScene'), {
  ssr: true,
})


const YourComponent = () => {
  useEffect(() => {
    function handleOrientationChange() {
      const joystickWrapper1 = document.getElementById('joystickWrapper1');
      if (window.matchMedia("(orientation: portrait)").matches) {
        joystickWrapper1.style.display = 'block';
      } else {
        joystickWrapper1.style.display = 'block';
      }
    }

    window.addEventListener("orientationchange", handleOrientationChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

}

const Home = () => {
  return (
    <>
      <div className='App'>
        <>
          {/*@ts-ignore*/}
          <Game />
          {YourComponent}
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
    </>
  )
}

export default Home
