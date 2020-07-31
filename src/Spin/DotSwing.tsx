import React from 'react';
import styled, { keyframes } from 'styled-components';

const DotContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

const Dot = styled.div`
    width: 0.25em;
    height: 0.25em;
    border-radius: 50%;
    background-color: currentColor;
`;

const leftSwing = keyframes`
    50%,
    100% {
        transform: translateX(95%);
    }
`;

const rightSwing = keyframes`
    50% {
        transform: translateX(-95%);
    }
    100% {
        transform: translateX(100%);
    }
`;


const Dot1 = styled(Dot)`
    transform: translateX(-100%);
    animation: ${leftSwing} 0.5s ease-in alternate infinite;
`;

const Dot2 = styled(Dot)`
`;

const Dot3 = styled(Dot)`
    transform: translateX(-95%);
    animation: ${rightSwing} 0.5s ease-out alternate infinite;
`;

const DotSwing = (
    <DotContainer>
        <Dot1/>
        <Dot2/>
        <Dot3/>
    </DotContainer>
);

export default DotSwing;