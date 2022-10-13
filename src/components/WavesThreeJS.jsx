import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
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

function WavesThreeJS() {

    const [idPage, setIdPage] = useState(0)

    function buttonClick(id) {
        setIdPage(id)
        States.setVisibleButtons(false)
        States.setOpacityDots(0.5)
    }

    return (
        <Canvas style={{ height: "100vh"}} camera={{fov: 75, far: 2000}}>
            <Dots width={600} height={35}/>
            {/* <Bloom>
            */}
                <ambientLight /> 
                <Particles count={500}/>
            {/* </Bloom> */}
            
            <Light />
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


