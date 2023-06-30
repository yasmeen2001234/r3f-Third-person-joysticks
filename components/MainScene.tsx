/*
 *      FRAMEWORK - REACT
 */
import React, { Suspense, useState, useMemo } from 'react'
import { Physics } from '@react-three/cannon'
import { isMobile } from 'react-device-detect'
import { Sky } from '@react-three/drei'
/*
 *      THREEJS
 */

import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import { OrbitControls, Stats, } from '@react-three/drei'

import Character from './Character'

import { Floor } from './Floor'

const Game = () => {
  const [state, setState] = useState({ x: 0, y: 0 })

  const fov = 45
  const aspect = 1920 / 1080
  const near = 1.0
  const far = 1000.0

  const camera_ = useMemo(() => {
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 2, -10)
    camera.rotation.set(0, Math.PI, 0)
    //  camera.rotateY(-270);
    return camera
  }, [])

  const character = useMemo(() => <Character />, [])

  return (
    <>
      <Canvas
        flat
        camera={camera_}
        frameloop='demand'
        dpr={2}
        gl={{ antialias: false }}
        onPointerDown={({ clientX: x, clientY: y }) => {
          setState({
            x: x - window.innerWidth / 2,
            y: -y + window.innerHeight / 2,
          })
        }}>
        <Stats />
     
        {/*@ts-ignore*/}
        <pointLight position={[100, 100, 100]} intensity={0.25} />
        {/*@ts-ignore*/}
        <pointLight position={[-100, -100, -100]} intensity={0.25} />
        {/*@ts-ignore*/}
        <ambientLight args={[0xffffff]} intensity={0.5} />

        <mesh position={[0, -1, 1]} scale={[1000, 1, 1000]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='gray' />
        </mesh>

        <Sky sunPosition={[500, 50, 1000]} turbidity={0.1} inclination={0.5} azimuth={0.25} />
        <Physics gravity={[0, -50, 0]}>
         
            <Floor />
        
          <Suspense fallback={null}>
            {character}
            {isMobile && <OrbitControls camera={camera_} />}
          </Suspense>
        </Physics>
      </Canvas>
    </>
  )
}

export default Game
