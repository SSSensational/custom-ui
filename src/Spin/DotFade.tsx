import React from 'react';
import styled, { keyframes } from 'styled-components';

const DotContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

const fade = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const Dot = styled.div`
    width: 0.25em;
    height: 0.25em;
    border-radius: 50%;
    background-color: currentColor;
    animation: ${fade} 0.8s ease-in-out alternate infinite;
`;

const Dot1 = styled(Dot)`
    animation-delay: -0.4s;
`;

const Dot2 = styled(Dot)`
    animation-delay: -0.2s;
`;

const Dot3 = styled(Dot)`

`;

const DotFade = (
    <DotContainer>
        <Dot1/>
        <Dot2/>
        <Dot3/>
    </DotContainer>
);

export default DotFade;