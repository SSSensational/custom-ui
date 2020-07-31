import styled, { keyframes } from 'styled-components';

const spinStretch = keyframes`
    50% {
        transform: rotate(360deg) scale(0.4, 0.33);
        border-width: 5px;
    }
    100% {
        transform: rotate(720deg) scale(.9, .9);
        border-width: 3px;
    }
`;

const BallSpinStretch = styled.div`
    border: 3px solid transparent;
    border-top-color: currentColor;
    border-bottom-color: currentColor;
    border-radius: 50%;
    left: -10% !important;
    top: -10% !important;
    animation: ${spinStretch} 2s ease infinite;
`;

export default BallSpinStretch;