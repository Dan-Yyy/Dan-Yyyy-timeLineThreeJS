import React, { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { observer } from "mobx-react-lite"
import States from "../store/States"

function Dots({
    // количество точек в длинну
        width, 
    // количество точек в ширину
        height, 
        wheel
    }) {

    // скорость волны
    const wavespeed = 0.2;
    // ширина волны
    const wavewidth = 200;
    // амплитуда по высоте волны
    const waveheight = 100;

    const ref = useRef() 
    const light = useRef()
    
    const { camera } = useThree()

    // позиционирование и направления камеры
    camera.lookAt(0, 300, 1200)
    camera.position.set(0, 300, 1200)

    // генерация начального положения точек волны
    const { vec, transform, positions } = useMemo(() => {

        // eslint-disable-next-line no-shadow
        const vec = new THREE.Vector3()
        // eslint-disable-next-line no-shadow
        const transform = new THREE.Matrix4()

        // eslint-disable-next-line no-shadow
        const positions = [];

        for ( let x = -100; x < width-100; x+=0.4 ) {
            for ( let y = 0; y < height; y+=1 ) { 
                const position = new THREE.Vector3()   

                position.x = x * 15;
                position.y = 0;
                position.z = y * 15;

                positions.push(position); 
            }
        }
        
        // eslint-disable-next-line no-shadow
        return { vec, transform, positions }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useFrame(({clock }) => {

        if(camera.position.x >= -300 && camera.position.x <= 7000) {
            camera.position.x += wheel.current
            camera.lookAt(camera.position.x, camera.position.y, 1200)
        } else {
            if(camera.position.x <= -300) {
                camera.position.x = -290
                camera.lookAt(camera.position.x, camera.position.y, 1200)
            }
            else {
                if(camera.position.x >= 7000) {
                    camera.position.x = 6990
                    camera.lookAt(camera.position.x, camera.position.y, 1200)
                }
            }
        }
        

        
        
        
        light.current.position.set(3500, 1000, 0)
        // расчет положения точек в момент по координате у (волна)
        for(let i = 0; i < width*2.5; i+=1) {
            const t = clock.elapsedTime;
            for(let j = 0; j < height; j+=1) {
                const tempIJ = i*height+ j
                positions[tempIJ].y = Math.cos((t +
                    (positions[tempIJ].z / wavewidth) +
                    (positions[tempIJ].x / wavewidth) ) * wavespeed * 2) * waveheight *
                    Math.sin(positions[tempIJ].x / wavewidth) 
                    
                vec.copy(positions[tempIJ])
                transform.setPosition(vec)
    
                ref.current.setMatrixAt(tempIJ, transform)
                ref.current.instanceMatrix.needsUpdate = true

            }
        }
    })

    return (
        <>        
            <pointLight ref={light} distance={40000} intensity={8} color="purpure" />
            <instancedMesh ref={ref} args={[null, null, positions.length]}>
                <sphereGeometry args={[1.3, 3, 2]} attach="geometry" />
                <meshStandardMaterial 
                    color="white" 
                    attach="material" 
                    transparent opacity={States.getOpacityDots()} 
                    metalness={0.9}/>
            </instancedMesh>
        </>
    )
}

export default observer(Dots)