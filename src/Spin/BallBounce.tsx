
import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
    0%, 100% { transform: scale(0.0) }
    50% { transform: scale(1.0) }
`;

const Spinner = styled.div`
`;

const Bounce = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${bounce} 2.0s infinite ease-in-out;
`;

const BounceTwo = styled(Bounce)`
    animation-delay: -1.0s;
`;

const BallBounce = (
    <Spinner>
        <Bounce/>
        <BounceTwo/>
    </Spinner>
);

export default BallBounce;
