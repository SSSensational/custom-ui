
import styled, { keyframes } from 'styled-components';
import Color from 'color';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const BallTrail = styled.div<{ color: string }>`
    box-sizing: border-box;
    border: ${({ color }) => `3px solid ${Color(color === 'currentColor' || color === 'currentcolor' ? '#fff' : color).opaquer(-.8).toString()}`};
    border-top-color: currentColor;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

export default BallTrail;
