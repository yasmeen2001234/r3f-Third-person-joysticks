// Based on https://codepen.io/al-ro/pen/jJJygQ by al-ro, but rewritten in react-three-fiber
import * as THREE from 'three'
import React, { useRef, useMemo, useState } from 'react'
import { makeNoise3D } from 'open-simplex-noise'
import { useFrame, useLoader } from '@react-three/fiber'
import { Geometry } from 'three/examples/jsm/deprecated/Geometry'

import './GrassMaterial.js'

export default function Grass({
  options = { bW: 0.1, bH: 0.8, joints: 5 },
  height = 10,
  width = 8,
  instances = 0,
  visiblity = false,
  ...props
}) {
  let bladeDiffuse = './images/blade_diffuse.webp'
  let bladeAlpha = './images/blade_alpha.webp'

  const { bW, bH, joints } = options
  const materialRef = useRef()
  const mesh = useRef()
  const [instances_, setInstances] = useState(0)

  const [texture, alphaMap] = useLoader(THREE.TextureLoader, [bladeDiffuse, bladeAlpha])
  const attributeData = useMemo(() => getAttributeData(instances, width, height), [instances, width, height])

  const baseGeom = useMemo(() => new THREE.PlaneBufferGeometry(bW, bH, 1, joints).translate(0, bH / 2, 0), [options])
  // baseGeom.position.set(3,3,3)

  const groundGeo = useMemo(() => {
    const geo = new Geometry().fromBufferGeometry(new THREE.PlaneGeometry(9, 10, 32, 32))
    geo.verticesNeedUpdate = true
    geo.lookAt(new THREE.Vector3(0, 1, 0))
    for (let i = 0; i < geo.vertices.length; i++) {
      const v = geo.vertices[i]
      v.y = getYPosition(v.x, v.z)
    }
    geo.computeVertexNormals()
    return geo.toBufferGeometry()
  }, [width])
  useFrame((state) => {
    materialRef.current.uniforms.time.value = state.clock.elapsedTime / 4
    if(visiblity == true) {
      mesh.current.frustumCulled=false;
    } else 
    mesh.current.frustumCulled=true;
  })

  return (
    <group {...props} >
      <mesh position={[20, -0.75, 19]} ref={mesh} >
        <instancedBufferGeometry
       
          index={baseGeom.index}
          attributes-position={baseGeom.attributes.position}
          attributes-uv={baseGeom.attributes.uv}>
          <instancedBufferAttribute attach='attributes-offset' args={[new Float32Array(attributeData.offsets), 3]} />
          <instancedBufferAttribute
           
            attach='attributes-orientation'
            args={[new Float32Array(attributeData.orientations), 4]}
          />
          <instancedBufferAttribute attach='attributes-stretch' args={[new Float32Array(attributeData.stretches), 1]} />
          <instancedBufferAttribute
 
            attach='attributes-halfRootAngleSin'
            args={[new Float32Array(attributeData.halfRootAngleSin), 1]}
          />
        </instancedBufferGeometry>
        <grassMaterial ref={materialRef} map={texture} alphaMap={alphaMap} toneMapped={false} />
      </mesh>
      {/*
        <mesh position={[20, 0.15, 19]} geometry={groundGeo}>
         <meshStandardMaterial color="#471e09" />
       </mesh>
  */}
    </group>
  )
}

function getAttributeData(instances, width, height) {
  const offsets = []
  const orientations = []
  const stretches = []
  const halfRootAngleSin = []
  const halfRootAngleCos = []

  let quaternion_0 = new THREE.Vector4()
  let quaternion_1 = new THREE.Vector4()

  //The min and max angle for the growth direction (in radians)
  const min = -0.25
  const max = 0.25

  //For each instance of the grass blade
  for (let i = 0; i < instances; i++) {
    //Offset of the roots
    const offsetX = Math.random() * width - width / 2
    const offsetZ = Math.random() * height - height / 2
    // const offsetY = getYPosition(offsetX, offsetZ)
    const offsetY = getYPosition(offsetX, offsetZ)
    offsets.push(offsetX, offsetY, offsetZ)

    //Define random growth directions
    //Rotate around Y
    let angle = Math.PI - Math.random() * (2 * Math.PI)
    halfRootAngleSin.push(Math.sin(0.5 * angle))
    halfRootAngleCos.push(Math.cos(0.5 * angle))

    let RotationAxis = new THREE.Vector3(0, 1, 0)
    let x = RotationAxis.x * Math.sin(angle / 2.0)
    let y = RotationAxis.y * Math.sin(angle / 2.0)
    let z = RotationAxis.z * Math.sin(angle / 2.0)
    let w = Math.cos(angle / 2.0)
    quaternion_0.set(x, y, z, w).normalize()

    //Rotate around X
    angle = Math.random() * (max - min) + min
    RotationAxis = new THREE.Vector3(1, 0, 0)
    x = RotationAxis.x * Math.sin(angle / 2.0)
    y = RotationAxis.y * Math.sin(angle / 2.0)
    z = RotationAxis.z * Math.sin(angle / 2.0)
    w = Math.cos(angle / 2.0)
    quaternion_1.set(x, y, z, w).normalize()

    //Combine rotations to a single quaternion
    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)

    //Rotate around Z
    angle = Math.random() * (max - min) + min
    RotationAxis = new THREE.Vector3(0, 0, 1)
    x = RotationAxis.x * Math.sin(angle / 2.0)
    y = RotationAxis.y * Math.sin(angle / 2.0)
    z = RotationAxis.z * Math.sin(angle / 2.0)
    w = Math.cos(angle / 5.0)
    quaternion_1.set(x, y, z, w).normalize()

    //Combine rotations to a single quaternion
    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)

    orientations.push(quaternion_0.x, quaternion_0.y, quaternion_0.z, quaternion_0.w)

    //Define variety in height
    if (i < instances / 3) {
      stretches.push(Math.random() * 1.8)
    } else {
      stretches.push(Math.random())
    }
  }

  return {
    offsets,
    orientations,
    stretches,
    halfRootAngleCos,
    halfRootAngleSin,
  }
}

function multiplyQuaternions(q1, q2) {
  const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x
  const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y
  const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z
  const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
  return new THREE.Vector4(x, y, z, w)
}

function getYPosition(x, z) {
  //   const simplex = new THREE.SimplexNoise(Math.random);
  const noise3D = makeNoise3D(Math.random)
  var y = 2 * noise3D(x / 50, z / 50)
  y += 70 * noise3D(x / 100, z / 100)
  y += 0.2 * noise3D(x / 10, z / 10)
  return y
}
