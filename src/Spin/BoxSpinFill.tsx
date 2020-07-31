import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    50%,
    100% {
        transform: rotate(360deg);
    }
`;

const fill = keyframes`
    25%,
    50% {
        transform: scaleY(0);
    }
    100% {
        transform: scaleY(1);
    }
`;

const BoxSpinFill = styled.div`
    border: 3px solid currentColor;
    overflow: hidden;
    animation: ${spin} 3s ease infinite;
    box-sizing: border-box;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2em;
        height: 2em;
        background-color: currentColor;
        opacity: .75;
        transform-origin: center bottom;
        transform: scaleY(1);
        animation: ${fill} 3s linear infinite;
    }
`;

export default BoxSpinFill;