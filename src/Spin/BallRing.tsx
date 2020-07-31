
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const SVG = styled.svg`
    animation: ${spin} 1.5s ease infinite;
`;

const Ring = styled.circle`
    fill: none;
    stroke: currentColor;
    opacity: .3;
    stroke-width: 3;
`;

const Ball = styled.circle`
    fill: currentColor;
    stroke: none;
`;


const BallRing = (
    <SVG viewBox="0 0 50 50">
        <Ring cx="25" cy="25" r="20"></Ring>
        <Ball cx="25" cy="5" r="3.5"></Ball>
    </SVG>
);

export default BallRing;
