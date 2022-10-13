import React, { useState, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFrame, useThree } from '@react-three/fiber'
import { observer } from 'mobx-react-lite'
import Dots from "./Dots"
import Button from './Button'
import buttonData from "../data"
import PageContent from './PageContent'
import Particles from './Particles'
import Light from "./Light"
import States from '../store/States'

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

// extend({ EffectComposer, RenderPass, UnrealBloomPass })

// function Bloom({ children }) {
//     const { gl, camera, size } = useThree()
//     const [scene, setScene] = useState()
//     const composer = useRef()

//     useEffect(() => void scene && composer.current.setSize(size.width, size.height), [scene, size])
//     useFrame(() => composer.current.render(), 1)

//     return (
//         <>
//             <scene ref={setScene}>{children}</scene>
//             <effectComposer ref={composer} args={[gl]}>
//                 <renderPass attachArray="passes" scene={scene} camera={camera} />
//                 <unrealBloomPass attachArray="passes" args={[undefined, 10, 1, 0]} />
//             </effectComposer>
//         </>
//     )
//   }

// function Mouse({mouseMove}) {
//     // const { camera } = useThree()
//     useFrame(({camera}) => {
//         // console.log(camera.position)
//         // const position = camera.position
//         // camera.lookAt(position.x, position.y+mouse.y/1000, position.z)
//         camera.position.lerp((camera.position.x, camera.position.y + mouseMove.current / 10, camera.position.z), 0.1)
//     })
// }

function WavesThreeJS() {

    const [idPage, setIdPage] = useState(0)
    const wheel = useRef(0)
    const mouseMove = useRef(1)

    function buttonClick(id) {
        setIdPage(id)
        States.setVisibleButtons(false)
        States.setOpacityDots(0.5)
        States.setWheelActive(false)
    }

    const handleWheel = useCallback(({deltaY}) => {
        
        if (window.wheelTimeout) {
            States.getWheelActive() && (wheel.current = deltaY)
            window.clearTimeout(window.wheelTimeout);
        }
         
        window.wheelTimeout = window.setTimeout(() => {
            States.getWheelActive() && (wheel.current = 0)
        }, 150);

    }, [])

    // const handleMouseMove = useCallback(({clientY: y}) => mouseMove.current = y, [])

    return (
        <Canvas style={{ height: "100vh"}} camera={{fov: 75, far: 2000}}
            onWheel={(e) => handleWheel(e)}
            // onMouseMove={handleMouseMove}
        >
            <Dots width={600} height={35} wheel={wheel}/>
            {/* <Bloom>
            */}
                <ambientLight /> 
                <Particles count={500}/>
            {/* </Bloom> */}
            
            <Light />
            {/* <Mouse mouseMove={mouseMove}/> */}
            {
                States.getVisibleButtons() && buttonData.map(item => (
                    <Button key={item.id} data={item} handleClick={buttonClick}/>
                ))
            }

            <PageContent content={buttonData[idPage].page} />
        </Canvas>
    )
}

export default observer(WavesThreeJS)


