import React from 'react'
import { useBox } from '@react-three/cannon'

export function Floor(props: any) {
  const [ref] = useBox<any>(() => ({
    type: 'Static',
    args: [500, 0.2, 500],
    position: [0, -0.2, 0],
    mass: 0,
    material: {
      friction: 0,
      name: 'floor',
      ...props,
    },
    collisionFilterGroup: 2,
  }))
  return (
    <group>
      <mesh ref={ref}>
        <boxGeometry />
        <meshPhongMaterial opacity={0} transparent />
      </mesh>
    </group>
  )
}
