import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import ElementButton from "../assets/svg/ElementButton"

export default function Button({data, handleClick}) {
    const [position, setOisition] = useState(data.position)

    const wavespeed = 0.2;
    const wavewidth = 200;
    const waveheight = 100;

    useFrame(({clock}) => {
      
        const t = clock.elapsedTime;
        
        const y = Math.cos((t + (position[2] / wavewidth) +
                (position[0] / wavewidth) 
            ) * wavespeed * 2) * waveheight *
                (Math.sin(position[0] / wavewidth))

        setOisition([position[0], y, position[2]])
    })

    var { camera } = useThree()

    function newHandleClick(id) {
        handleClick(id); 

        let temp = 0
        const interval = setInterval(() => {
            if(temp < 50) {
                
                camera.position.set(camera.position.x, camera.position.y-temp*2, camera.position.z + temp*1.3)
                temp += 1
            }
            temp === 50 && clearInterval(interval)
        }, 30)

    }


    return(
        <Html position={position} center>
            <ButtonContainer onClick={() => newHandleClick(data.id)}>
            
                <Text>
                    <p>{data.text}</p>
                    <span>{data.description}</span>
                </Text>
                <ElementButton className="element"/>
                <Rotate className="element1"/>
                <Rotate className="element2"/>
                <Rotate className="element3"/>
                <Rotate className="element4"/>
                <ImageContainer>
                    <Image src={data.image} alt="image" />
                </ImageContainer>
            </ButtonContainer>
        </Html>
    )
}

const rotate = (from, to) => keyframes`
    from {
        transform: rotate(${from}deg)
    }

    to {
        transform: rotate(${to}deg)
    }
`

const Image = styled.img``

const Text = styled.div`
    position: absolute;
    top: -155px;
    left: -70px;

    width: 140px;
    font-family: 'Source Sans Pro', sans-serif;

    color: white;
    text-align: center;
    transition: all 0.5s;
    p {
        font-size: 20px;
    }
    span {
        font-size: 16px;
        color: rgb(87, 244, 244);

        opacity: 0;
        transform: scale(0.95);
        transition: all 0.1s linear 0s;
    }
`

const ImageContainer = styled.div`
    position: absolute;
    width: 104px;
    height: 104px;
    border: 1px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: all 0.5s;
    overflow: hidden;
`

const ButtonContainer = styled.div`
    position: relative;
    cursor: pointer;

    transition: all 0.5s;

    &:hover {
        ${Text} {
            transform: translate(0px, calc(25px - 100%));
            span {
                opacity: 1;
                transform: scale(1);
            }
        }
        ${ImageContainer} {
            transform: translate(-50%, -50%) scale(1);
        }

        .element {
            transform: scale(0.8);
        }
    }
`



const Rotate = styled.div`
    position: absolute;
    
    border: 1px solid white;
    border-radius: 50%;
    &.element1 {
        top: -55px;
        left: -60px;

        width: 110px;
        height: 120px;

        opacity: 0.8;
        animation: ${rotate(0, 360)} 10s linear -2s infinite;
    }
    
    &.element2 {
        top: -53px;
        left: -62px;

        width: 124px;
        height: 106px;

        opacity: 0.3;
        animation: ${rotate(0, 360)} 9s linear -4s infinite reverse;
    }

    &.element3 {
        top: -61px;
        left: -54px;

        width: 108px;
        height: 122px;

        opacity: 0.3;
        animation: ${rotate(0, 360)} 8s linear -6s infinite reverse;
    }

    &.element4 {
        top: -60px;
        left: -70px;

        width: 140px;
        height: 120px;

        opacity: 0.3;
        animation: ${rotate(0, 360)} 12s linear -5s infinite reverse;
    }
`