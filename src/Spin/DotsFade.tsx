import React from 'react';
import styled, { keyframes } from 'styled-components';

const DotContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
`;

const fade = keyframes`
    to {
        opacity: 0.2;
    }
`;

const Dot = styled.div`
    width: 0.2em;
    height: 0.2em;
    border-radius: 50%;
    background-color: currentColor;
    animation: ${fade} 1.5s alternate ease-in-out infinite;
`;

const Dot1 = styled(Dot)`
    animation-delay: 0.25s;
`;

const Dot2 = styled(Dot)`
    animation-delay: 0.5s;
`;

const Dot3 = styled(Dot)`
    animation-delay: 0.75s;
`;

const Dot4 = styled(Dot)`
    animation-delay: 1s;
`;

const DotsFade = (
    <DotContainer>
        <Dot/>
        <Dot1/>
        <Dot2/>
        <Dot1/>
        <Dot2/>
        <Dot3/>
        <Dot2/>
        <Dot3/>
        <Dot4/>
    </DotContainer>
);

export default DotsFade;