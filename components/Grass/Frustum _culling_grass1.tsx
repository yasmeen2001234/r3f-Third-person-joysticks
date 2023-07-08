import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Grass = React.lazy(() => import('./Grass'))
interface Props {
  camera: any
}
export default function Frustum_culling_ocean({ camera }: Props) {
  const mesh = useRef<THREE.InstancedMesh>()
  const [visible, setVisible] = React.useState(true)
  const frustum = new THREE.Frustum()

  useFrame((state, delta) => {
    if (!mesh.current) return

    //The code calculates a matrix that combines the camera's projection and position.
    //Then, using that matrix, it sets up a frustum that defines the visible area of the camera's view.

    const camera = state.camera
    const cameraViewProjectionMatrix = new THREE.Matrix4()
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix)

    //The instanced mesh serves as a reference for determining the visibility of the grass.

    const box = new THREE.Box3().setFromObject(mesh.current)
    const isBoxOutsideFrustum = !frustum.intersectsBox(box)
    mesh.current.instanceMatrix.needsUpdate = true

    // Check if the instanced mesh is out of view
    // if the instanced mesh is outside the camera's frustum we set the grass visibilty to false otherwise true
    if (isBoxOutsideFrustum) {
      setVisible(false)
      console.log('Grass is removed')
    } else {
      console.log('Grass is added')
      setVisible(true)
    }
  })

  return (
    <>
      <Grass position={[-0.5, -0.3, 0]} width={10} instances={3500} visiblity={visible} />
      <instancedMesh ref={mesh} scale={[1, 1, 1]} args={[null, null, 1000]} position={[19, 0, 19]}>
        <boxBufferGeometry args={[9, 1, 9]} />
        <meshStandardMaterial attach='material' color={'white'} opacity={0} transparent={true} />
      </instancedMesh>
    </>
  )
}
