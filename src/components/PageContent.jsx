// import { useThree } from "@react-three/fiber"
import React from "react"
import { Html } from '@react-three/drei'
import styled from "styled-components"
import { useThree } from '@react-three/fiber'
import { observer } from 'mobx-react-lite'
import parse from "html-react-parser"
import States from '../store/States'
import Slider from "./Slider"

function PageContent({ content }) {

    const { camera } = useThree()

    function handleClick() {

        let temp = 0
        const interval = setInterval(() => {
            if(temp < 50) {
                camera.position.set(camera.position.x, camera.position.y + temp*2, camera.position.z - temp)
                temp += 1
            }
            if(temp === 50) {
                States.setVisibleButtons(true)
                States.setOpacityDots(1)
                clearInterval(interval)
            } 
        }, 30)

    }  
    
    return(
        <Html position={[0, -2052, 2792.5]} center>
           <Container>
                <ButtonToTop onClick={handleClick}>
                    <LineContainer >
                        <Line/>
                    </LineContainer>
                    <ButtonName>back to timeLine</ButtonName>
                </ButtonToTop>
                <Wrap>
                    <Title>{content.title}</Title>
                    <SupTitle>{content.description}</SupTitle>
                </Wrap>
                {content.images && <Slider images={content.images}/>}
                <Wrap>
                    <Text>{parse(content.text)}</Text>
                </Wrap>
           </Container>
        </Html>
    )
}

export default observer(PageContent)

const Container = styled.div`
    position: relative;
    padding: 150px 0;
    width: 100vw;
    height: 100vh;
    transition: all 0.5s;
    overflow-y: auto;
`
const Wrap = styled.div`
    max-width: 45%;
    width: 100%;
    margin: 50px auto;

    font-family: 'Source Sans Pro';
    color: white;
`

const Title = styled.div`
    font-size: 26px;
    font-weight: 100;
`

const SupTitle = styled.div`
    font-weight: 300;
    letter-spacing: -0.05em;
    font-size: 36px;
    line-height: 42px;
`

const Text = styled.div`
    margin: 20px auto;
    font-size: 16px;
    line-height: 20px;

    p{
        margin-bottom: 12px;
    }
`

const LineContainer = styled.div`
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: -2px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: white;
    }
`

const Line = styled.div`
    width: 1px;
    height: 40px;
    background-color: white;
    transform-origin: bottom;
    transition: .5s ease;
`

const ButtonName = styled.div`
    margin-top: 10px;
    white-space: nowrap;
    font-size: 11px;
    font-weight: 100;
    text-transform: uppercase;
    color: white;
`

const ButtonToTop = styled.div`
    position: absolute;
    top: 150px;
    left: calc(50% - 66px);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    cursor: pointer;

    &:hover {
        ${Line} {
            transform: scale(0);
        }
    }
`
