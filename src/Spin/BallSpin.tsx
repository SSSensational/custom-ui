import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotateY(540deg);
    }
`;

const Box = styled.div`
    perspective: 120px;
`;

const Coin = styled.div`
    box-sizing: border-box;
    height: 100%;
    border-radius: 50%;
    border: 3px solid currentColor;
    animation: ${spin} 1.5s ease-in-out infinite;
`;

const BallSpin = (<Box ><Coin /></Box>);

export default BallSpin;