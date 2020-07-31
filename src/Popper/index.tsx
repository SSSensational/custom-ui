import React, { useCallback, PropsWithChildren, CSSProperties } from 'react';
import styled from 'styled-components';
import Tippy from "@tippyjs/react/headless";
import { followCursor } from 'tippy.js';
import { useSpring, animated } from "react-spring";
import { transitionAnimation, TransitionAnimationType } from '../Animation';

export interface Props {
    Content: React.ReactNode;
    children: React.ReactElement<any>;
    animationType: TransitionAnimationType;
    placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'auto' | 'auto-start' | 'auto-end';
    className?: string;
    style?: CSSProperties;
    animationDuration?: number | { enter: number, leave: number };
    delay?: number | { enter: number, leave: number };
    followCursor?: boolean | 'horizontal' | 'vertical' | 'initial';
    visible?: boolean;
    disabled?: boolean;
    interactive?: boolean;
    interactiveBorder?: number;
    interactiveDebounce?: number;
    inlinePositioning?: boolean;
    trigger?: 'mouseenter focus' | 'click' | 'focusin' | 'mouseenter click';
    hideOnClick?: boolean | 'toggle';
    triggerTarget?: Element | Element[];
    zIndex?: number;
    arrow?: boolean;
}

const PopperContainer = styled(animated.div)<{ custom?: 'true' }>`
    background: ${({ custom }) => custom ? '' : '#333'};
    color: ${({ custom }) => custom ? '' : 'white'};
    padding: ${({ custom }) => custom ? '0' : '5px 10px'};
    border-radius: ${({ custom }) => custom ? '' : '4px'};
    width: ${({ custom }) => custom ? 'fit-content' : ''};
    will-change: transform;
    &[data-placement ^= top] > .tippy-arrow { 
        bottom: -4px;
    }
    &[data-placement ^= bottom] > .tippy-arrow {
        top: -4px;
    }
    &[data-placement ^= left] > .tippy-arrow {
        right: -4px;
    }
    &[data-placement ^= right] > .tippy-arrow {
        left: -4px;
    }
    .tippy-arrow {
        position: absolute;
        z-index: -1;
        width: 8px;
        height: 8px;
        background-color: inherit;
        visibility: hidden;
        &::before {
            visibility: visible;
            position: absolute;
            width: 8px;
            height: 8px;
            content: '';
            transform: rotate(45deg);
            background-color: inherit;
        }
    }
`;

const Popper = ({ children, Content, animationType, animationDuration, delay, className, style, arrow, ...props }: PropsWithChildren<Props>) => {
    const [styles, setStyles] = useSpring(() => transitionAnimation[animationType].from);

    const onMount = useCallback(() => {
        setStyles({ ...transitionAnimation[animationType].enter, config: { mass: 1, tension: 240, friction: 26, clamp: false, duration: typeof animationDuration === 'number' ? animationDuration : animationDuration?.enter } });
    }, [animationType, animationDuration, setStyles]);

    const onHide = useCallback(({ unmount }) => {
        setStyles({ ...transitionAnimation[animationType].leave, onRest: unmount, config: { mass: 1, tension: 280, friction: 24, clamp: true, duration: typeof animationDuration === 'number' ? animationDuration : animationDuration?.leave } });
    }, [animationType, animationDuration, setStyles]);

    return (
        <Tippy
            render={attrs => (
                <PopperContainer
                    className={className}
                    style={{ ...style, ...styles }}
                    {...attrs}
                    custom={typeof Content !== 'string' && typeof Content !== 'number' && typeof Content !== 'boolean' ? 'true' : undefined}
                >
                    {typeof Content === 'function' ? <Content /> : Content}
                    {arrow && <div data-popper-arrow className="tippy-arrow" />}
                </PopperContainer>
            )}
            animation={true}
            onMount={onMount}
            onHide={onHide}
            {...props}
            delay={typeof delay === 'number' ? delay : [delay?.enter, delay?.leave] as any}
            plugins={[followCursor]}
        >
            {children}
        </Tippy>
    );
}

Popper.defaultProps = {
    placement: 'top',
    animationType: 'zoom',
};

export default Popper;