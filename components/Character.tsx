import React from 'react'
import { useFBX } from '@react-three/drei'
import ThirdPersonCharacterControls from '@bonuz/react-three-third-person'

const PATH = './Animation_model/'

const animationPaths = {
  idle: `${PATH}/Idle.fbx`,
  walk: `${PATH}/Walking.fbx`,
  run: `${PATH}/Running.fbx`,
  jump: `${PATH}/Jumping_Up.fbx`,
  inAir: `${PATH}/Falling_To_Landing.fbx`,
  backpedal: `${PATH}/Walking_Backwards.fbx`,
  turnLeft: `${PATH}/left_turn.fbx`,
  turnRight: `${PATH}/right_turn.fbx`,
}

export default function ThirdPersonCharacter() {
  const characterObj = useFBX(`${PATH}/player.fbx`)
  characterObj.scale.setScalar(0.01)
  //characterObj.rotation.set(-3.14, 0, -3.14)

  characterObj.position.set(0, -0.4, 0)

  return (
    <>
      <ThirdPersonCharacterControls
        cameraOptions={{
          yOffset: 1.6,

          minDistance: 0.6,
          maxDistance: 7,
          collisionFilterMask: 2,
        }}
        camera={{
          position: [0, 0, 0],
          fov: 45,
          near: 0.1,
          far: 2000,
        }}
        characterObj={characterObj}
        animationPaths={animationPaths}
      />
    </>
  )
}
