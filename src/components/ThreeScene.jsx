import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function PlayfulBlob() {
  const mesh = useRef()
  const material = useRef()

  useFrame((state) => {
    const { mouse, clock } = state

    const time = clock.elapsedTime

    // Floating
    mesh.current.position.y = Math.sin(time) * 0.3

    // Repel effect (menghindar dari cursor)
    const targetX = -mouse.x * 1.5
    const targetY = -mouse.y * 1.5

    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.08
    mesh.current.position.y += (targetY - mesh.current.position.y) * 0.08

    // Smooth rotation
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.015

    // Color shift playful
    const hue = (time * 20) % 360
    material.current.color = new THREE.Color(`hsl(${hue}, 80%, 60%)`)
  })

  return (
    <mesh ref={mesh} scale={2.3}>
      <icosahedronGeometry args={[1, 32]} />
      <MeshDistortMaterial
        ref={material}
        distort={0.5}
        speed={2}
        roughness={0}
      />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <PlayfulBlob />
    </Canvas>
  )
}
