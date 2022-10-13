import React from "react"
import styled from "styled-components"

export default function ElementButton({className}) {
    return(
        <SVG className={className}
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="146" height="218" viewBox="0 0 146 218" fill="none">
            <path d="M70.2099,136.5C67.1674,137.632,65,140.563,65,144C65,148.418,68.5817,152,73,152C77.4183,152,81,148.418,81,144C81,140.455,78.6939,137.448,75.5,136.398" stroke="#CFE3EC" stroke-miterlimit="10" transform="translate(73,144.199) translate(-73,-144.199)" class="innerc"></path> 
            <path opacity="0.5" d="M73,145L73,22" stroke="#CFE3EC" transform="translate(73,145) translate(-73,-145)" class="vline"></path> 
            <ellipse rx="2" ry="2" cx="73" cy="144" fill="#CFE3EC"></ellipse> 
            <ellipse rx="3" ry="3" cx="73" cy="20" fill="#CFE3EC" class="dot_top"></ellipse>
        </SVG>
    )
}

const SVG = styled.svg`
    position: absolute;
    top: -147px;
    left: -73px;
    transition: all 0.5s;
`