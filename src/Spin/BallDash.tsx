
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const dash = keyframes`
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dashoffset: -125px;
    }
`;

const SVG = styled.svg`
    transform-origin: center;
    animation: ${rotate} 2s linear infinite;
`;

const Circle = styled.circle`
    fill: none;
    stroke: currentColor;
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
`;



const BallDash = (
    <SVG viewBox="25 25 50 50">
        <Circle cx="50" cy="50" r="20"></Circle>
    </SVG>
);

export default BallDash;
