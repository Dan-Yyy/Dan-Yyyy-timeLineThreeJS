import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Particles({ count }) {
    const mesh = useRef()
    const light = useRef()
    // const { size, viewport } = useThree()
    // const aspect = size.width / viewport.width

    const dummy = useMemo(() => new THREE.Object3D(), [])

    // генерация рандомных позиций, скорости и тайминга
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 100 + Math.random() * 100
            const speed = 0.03 + Math.random() / 200
            const xFactor = -2000 + Math.random() * 10000
            const yFactor = -500 + Math.random() * 1000
            const zFactor = Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])
    

    useFrame((state) => {
        // свет на точки 
        light.current.position.set(3500, 1000, 0)

        // цикл просчета положения точек в момент 
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            particle.mx += (particle.mx) * 0.01
            particle.my += (particle.my) * 0.01
            
            // позиция точек на канвсе
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            <pointLight ref={light} distance={40000} intensity={8} color="green" />
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <dodecahedronBufferGeometry args={[3, 4]} />
                <meshStandardMaterial color="white"
                    metalness={0.9}/>
            </instancedMesh>
        </>
    )
}
