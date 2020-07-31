import React, { useRef, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useTransition } from 'react-spring'
import { isMobile } from '../_utils';
import { XOR } from '../_types'
import Ripple from './Ripple';

export interface Props {
    color?: string;
    center?: boolean;
    preventDupClick?: boolean;
    disabled?: boolean;
    duration?: number;
}

interface Ripple {
    key: number;
    rippleX: number;
    rippleY: number;
    rippleSize: number;
}

const Container = styled.span`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
`;


const RippleContainer = ({ color, duration , center, preventDupClick, disabled }: PropsWithChildren<Props>) => {
    const [rippleArray, setRippleArry] = useState<Ripple[]>([]);
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const nextKey = useRef<number>(0);
    const render = useTransition(rippleArray, {
        keys: (item: Ripple) => item.key,
        from: { transform: 'scale(0)', opacity: 0.1 },
        enter: { transform: 'scale(1)', opacity: 0.25 },
        leave: { transform: 'scale(1)', opacity: 0 },
        config: { mass: 1, tension: 160, friction: 30, duration }
    });

    useEffect(() => {
        const parentNode = wrapperRef.current ? (wrapperRef.current.parentNode as HTMLElement): null;
        if (!parentNode) return;
        const positionVal = getComputedStyle(parentNode)['position'];
        if (positionVal !== 'absolute' && positionVal !== 'fixed') 
            parentNode.style.position = 'relative';
        parentNode.style.overflow = 'hidden';
    }, []);
    
    const handleStop = useCallback(() => {
        setRippleArry((pre: any) => pre.slice(1));
    }, []);

    const handleStart = useCallback((e: XOR<React.MouseEvent, React.TouchEvent>) => {
        if (disabled || !wrapperRef.current?.parentNode) return;

        const element = wrapperRef.current.parentNode as HTMLElement;
        const rect = element ? element.getBoundingClientRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };

        let rippleX: number, rippleY: number, rippleSize: number;
        if (center || (e.clientX === 0 && e.clientY === 0) || (!e.clientX && !e.touches)) {
            rippleX = Math.round(rect.width / 2);
            rippleY = Math.round(rect.height / 2);
        } else {
            const clientX = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0;
            const clientY = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY: 0;
            rippleX = Math.round(clientX - rect.left);
            rippleY = Math.round(clientY - rect.top);
        }
        
        if (center) rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3);
        else {
            const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
            const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
            rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
        }

        if (!preventDupClick) nextKey.current++;
        setRippleArry((pre: Ripple[]) => {
            return [
                ...pre,
                {
                    key: nextKey.current,
                    rippleX,
                    rippleY,
                    rippleSize
                }
            ]
        });
    }, [disabled, center, preventDupClick]);

    const handleMouseStart = useCallback((e: React.MouseEvent) => {
        if (!isMobile) handleStart(e);
    }, [handleStart]);

    const handleMouseStop = useCallback(() => {
        if (!isMobile) handleStop();
    }, [handleStop]);

    return (
        <Container
            ref={wrapperRef}
            onMouseDown={handleMouseStart}
            onMouseUp={handleMouseStop}
            onMouseLeave={handleMouseStop}
            onTouchStart={handleStart}
            onTouchEnd={handleStop}
            onTouchMove={handleStop}
            onTouchCancel={handleStop}
        >
            {render((style: any, item: Ripple) => <Ripple style={style} x={item.rippleX} y={item.rippleY} size={item.rippleSize} color={color}/>)}
        </Container>
    );
}

RippleContainer.defaultProps = {
    color: 'currentColor',
    center: false,
    preventDupClick: false,
    disabled: false,
};

export default RippleContainer;