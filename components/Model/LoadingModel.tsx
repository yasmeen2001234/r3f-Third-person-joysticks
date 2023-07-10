import { useLoader } from '@react-three/fiber'
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Scene() {
    const gltf = useLoader(GLTFLoader, './Animation_model/stork.glb')
   
    return <primitive object={gltf.scene} position={[19, 0, 19]} />
  }