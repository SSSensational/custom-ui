import React from 'react';
import styled, { keyframes } from 'styled-components';

const flip = keyframes`
    to {
        transform: rotateY(540deg);
    }
`;

const Box = styled.div`
    perspective: 120px;
`;

const Plane = styled.div`
    height: 100%;
    background-color: currentColor;
    transform: rotate(0);
    animation: ${flip} 1s infinite;
`;

const BoxFlip: React.FC = () => (<Box ><Plane/></Box>);

export default BoxFlip;