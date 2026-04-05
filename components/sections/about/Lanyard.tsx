/* eslint-disable react/no-unknown-property */
'use client'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import './Lanyard.css'

function CardModel() {
    const meshRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Gentle rotation
            meshRef.current.rotation.y += delta * 0.5
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1

            // Hover effect
            if (hovered) {
                meshRef.current.scale.setScalar(1.1)
            } else {
                meshRef.current.scale.setScalar(1)
            }
        }
    })

    return (
        <group
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
            position={[0, 0, 0]}
        >
            {/* Main card body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.2, 3.2, 0.05]} />
                <meshPhysicalMaterial
                    color={hovered ? "#ff6b35" : "#ff8c00"}
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                />
            </mesh>

            {/* Card border/frame */}
            <mesh position={[0, 0, 0.03]}>
                <boxGeometry args={[2.4, 3.4, 0.02]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Inner card content area */}
            <mesh position={[0, 0, 0.01]}>
                <boxGeometry args={[1.8, 2.8, 0.01]} />
                <meshPhysicalMaterial
                    color="#1a1a1a"
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>

            {/* Decorative elements */}
            <mesh position={[-0.6, 1, 0.02]}>
                <cylinderGeometry args={[0.05, 0.05, 0.01]} />
                <meshPhysicalMaterial
                    color="#ff4500"
                    metalness={1}
                    roughness={0}
                />
            </mesh>

            <mesh position={[0.6, 1, 0.02]}>
                <cylinderGeometry args={[0.05, 0.05, 0.01]} />
                <meshPhysicalMaterial
                    color="#ff4500"
                    metalness={1}
                    roughness={0}
                />
            </mesh>
        </group>
    )
}

export default function Lanyard({ position = [0, 0, 20] as [number, number, number], fov = 20, transparent = true }) {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="lanyard-wrapper">
            <Canvas
                camera={{ position: position, fov: fov }}
                dpr={[1, isMobile ? 1.5 : 2]}
                gl={{ alpha: transparent }}
                onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
            >
                <ambientLight intensity={Math.PI} />
                <CardModel />
                <Environment blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    )
}
