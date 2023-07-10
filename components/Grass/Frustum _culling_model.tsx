import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Grass = React.lazy(() => import('./LoadingModel'))
interface Props {
  camera: any
}

const tempObject = new THREE.Object3D()

export default function Frustum_culling_ocean({ camera }: Props) {
  const mesh = useRef<THREE.InstancedMesh>()
  const [visible, setVisible] = React.useState(true)
  const frustum = new THREE.Frustum()

  useFrame((state, delta) => {
    if (!mesh.current) return

    // Check if the instanced mesh is out of view
    const camera = state.camera

    const cameraViewProjectionMatrix = new THREE.Matrix4()
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix)
    const box = new THREE.Box3().setFromObject(mesh.current)
    const isBoxOutsideFrustum = !frustum.intersectsBox(box)

    //  setVisible(!isBoxOutsideFrustum);

    let i = 0
    let number = 4
    for (let x = 0; x <= number; x++)
      for (let z = 0; z <= number; z++) {
        const id = i++
        tempObject.position.set(2.05 * (x / number - 0.5), 0, 2.05 * (z / number - 0.5))
        const scale = 1
        tempObject.scale.set(scale, scale, scale)
        tempObject.updateMatrix()
        mesh.current.setMatrixAt(id, tempObject.matrix)
      }
    mesh.current.instanceMatrix.needsUpdate = true

    if (!isBoxOutsideFrustum) {
      setVisible(true)
      console.log('Added')
    } else {
      setVisible(false)
      console.log('Removed')
    }
  })

  return (
    <>
      {visible ? <Grass /> : null}
      <instancedMesh ref={mesh} scale={[1, 1, 1]} args={[null, null, 1000]} position={[19, 0, 19]}>
        <boxBufferGeometry args={[2, 1, 2]} />
        <meshStandardMaterial attach='material' color={'white'} opacity={0} transparent={false} />
      </instancedMesh>
    </>
  )
}
