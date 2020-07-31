
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;
const pulse = keyframes`
    from {
        transform: scale(0.5);
    }
    to {
        transform: scale(1);
    }
`;

const BallTwo = styled.div`
    display: flex;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-bottom-color: currentColor;
    border-radius: 50%;
    animation: ${spin} 1.5s linear infinite;
    box-sizing: border-box;
    &::before {
        content: '';
        display: block;
        margin: auto;
        width: 0.25em;
        height: 0.25em;
        border: 2px solid currentColor;
        border-radius: 50%;
        animation: ${pulse} 1s alternate ease-in-out infinite;
    }
`;

export default BallTwo;