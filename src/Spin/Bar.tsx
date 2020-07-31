import React from 'react';
import styled, { keyframes } from 'styled-components';

const BarContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

const Bar = styled.div`
    width: 0.125em;
    height: .5em;
    background-color: currentColor;
`;

const grow = keyframes`
    0%,
    100% {
        transform: scaleY(1);
    }

    50% {
        transform: scaleY(2);
    }
`;

const Bar1 = styled(Bar)`
    animation: ${grow} 1s -0.45s ease-in-out infinite;
`;

const Bar2 = styled(Bar)`
    animation: ${grow} 1s -0.3s ease-in-out infinite;
`;

const Bar3 = styled(Bar)`
    animation: ${grow} 1s -0.15s ease-in-out infinite;
`;

const Bar4 = styled(Bar)`
    animation: ${grow} 1s ease-in-out infinite;
`;

const BarLoading = (
    <BarContainer>
        <Bar1/>
        <Bar2/>
        <Bar3/>
        <Bar4/>
    </BarContainer>
);

export default BarLoading;