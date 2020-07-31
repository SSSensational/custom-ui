import { CSSProperties } from 'react'
import styled from 'styled-components';
import { animated } from 'react-spring';

interface RippleProps {
    x: number;
    y: number;
    size: number;
    color?: string;
    style?: CSSProperties;
}

const Ripple = styled(animated.span).attrs(({ x, y, size }: RippleProps) => ({
    style: {
        width: `${size ? size : 50}px`,
        height: `${size ? size : 50}px`,
        top: `${size && y ? (y - (size / 2)) : 0}px`,
        left: `${size && x ? (x - (size / 2)) : 0}px`,
    }
}))<RippleProps>`
    position: absolute;
    border-radius: 50%;
    opacity: 0.75;
    pointer-events: none;
    background-color: ${({ color }) => color };
`;

export default Ripple;