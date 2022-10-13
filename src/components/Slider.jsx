import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from "swiper";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

import "swiper/css";
// import "swiper/css/navigation";

export default function Slider({images}) {

    const [activeIndexSlider, setActiveIndexSlider] = useState(0)

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    return(
        <Container>
            <Swiper
                className="swiper"
                spaceBetween={-400}
                modules={[Navigation]}
                slidesPerView={1}
                centeredSlides={true}
                speed={1000}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                onSlideChange={(swiper) => setActiveIndexSlider(swiper.activeIndex)}
            >
                {
                    images.map(item => (
                    <SwiperSlide key={item.alt} className="slide">
                        <img src={item.src} alt={item.alt} />
                    </SwiperSlide>))
                }
                <NavigationBlock>
                    <Text>{images[activeIndexSlider].text}</Text>
                    <Navigate>
                        <Pagination>
                            <div>{activeIndexSlider + 1}</div>
                            <div>{images.length}</div>
                        </Pagination>  
                        <NavigateButton ref={navigationPrevRef}>
                            <IoIosArrowBack size={20} color="#0092bc" className="prev"/>
                        </NavigateButton>
                        <NavigateButton ref={navigationNextRef}>
                            <IoIosArrowForward size={20} color="#0092bc" className="next"/>
                        </NavigateButton>
                    </Navigate>
                </NavigationBlock>
            
        </Swiper>
      </Container>
    )
}

const Container = styled.div`
    font-family: 'Source Sans Pro',sans-serif;

    .slide {
        display: flex;
        justify-content: center;
    }
`

const NavigationBlock = styled.div`
    z-index: 100;
    position: absolute;
    right: 20%;
    bottom: 0;
    width: 280px;
    height: 250px;
    background-color: rgb(232, 242, 244);
`

const Text = styled.div`
    padding: 30px 30px 0;
    font-size: 16px;
`

const NavigateButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    margin: 0 4px;
    border: 1px solid #0092bc;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;

    .prev, .next {
        transition: 0.3s;
    }

    &.swiper-button-disabled {
        opacity: 0.3;
    }

    &:hover {
        .prev{
            transform: translate(-4px, 0)
        }
        .next{
            transform: translate(4px, 0)
        }
    }

    &.swiper-button-disabled:hover {
        .prev, .next {
            transform: none;
        }
    }

`

const Navigate = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: flex-start;    
    align-items: center;
    width: 100%;
    padding: 20px;
`

const Pagination = styled.div`
    display: flex;
    font-size: 14px;
    color: #0092bc;
    margin-right: 16px;
    div {
        margin: 0 16px;
    }
    div:first-child {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 9px;
            left: 10px;
            width: 25px;
            height: 0.1rem;
            background: #0092bc;
        }
    }
`