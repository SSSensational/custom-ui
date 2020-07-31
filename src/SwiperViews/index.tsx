import React, { useRef, useCallback, useEffect, forwardRef, useImperativeHandle, HTMLAttributes, PropsWithChildren } from 'react'
import { clamp } from 'lodash-es'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styled from 'styled-components';
import { useMeasure } from '../_hooks';
import { OverWrite, RequiredOptional, XOR } from '../_types';

type BaseProps = OverWrite<HTMLAttributes<HTMLDivElement>, {
    scaleInDrag?: boolean | 'noShadow';
    direction?: 'row' | 'column';
    size?: number;
    enableDrag?: boolean;
    autoplay?: boolean | number;
}>;

type PropsWithCircular = BaseProps & {
    circular?: boolean;
}

type PropsWithLoop = BaseProps & {
    loop?: boolean;
}

export type Props = XOR<PropsWithCircular, PropsWithLoop>;

export interface Methods {
    goto: (index: number) => void;
}

const Slider = styled(animated.div)`
    display: flex;
    will-change: transform;
    width: 100%;
    height: 100%;
`;

const Views = styled(animated.div)`
    flex-shrink: 0;
    will-change: transform;
    overflow: hidden;
    > div {
        width: 100%;
        height: 100%;
    }
`;

const Container = styled.div<RequiredOptional<Props, 'size' | 'scaleInDrag'> & { space: number }>`
    overflow: hidden;
    user-select: none;
    ${Slider} {
        flex-direction: ${({ direction }) => direction};
    }
    ${Views} {
        width: ${({ size, direction }) => direction === 'row' ? `${size * 100}% !important` : '100%'};
        height: ${({ size, direction }) => direction === 'column' ? `${size * 100}% !important` : '100%'};
        box-shadow: ${({ scaleInDrag }) => scaleInDrag && scaleInDrag !== 'noShadow' ? '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)' : 'unset'};
        margin-left: ${({ space, direction }) => direction === 'row' ? `${space * 2}px` : ''};
        margin-top: ${({ space, direction }) => direction === 'column' ? `${space * 2}px` : ''};
    }
    ${Views} + ${Views} {
        margin-left: ${({ space, direction }) => direction === 'row' ? `${space}px` : ''};
        margin-top: ${({ space, direction }) => direction === 'column' ? `${space}px` : ''};
    } 
`;

const SwiperViews = forwardRef<Methods, PropsWithChildren<Props>>(({ children, scaleInDrag = true, circular, loop, size = 1, enableDrag, direction = 'row', autoplay, ...props }, method) => {
    const [ref, { width, height }] = useMeasure();
    const realSize = size > 1 ? 1 : size < .5 ? .5 : size;
    const realBoundary = (direction === 'row' ? width : height) * realSize;
    const space = (direction === 'row' ? width : height) * (1 - realSize) / 4;

    const index = useRef(loop && children instanceof Array && children.length > 1 ? 2 : 0);
    const viewsNum = children instanceof Array ? loop && children.length > 1 ? children.length + 4 : children.length : 1;

    const [views, setViews] = useSpring({ scale: 1 }, []);
    const [sliderStyle, setSlider] = useSpring({
        x: direction === 'row' ? -index.current * (realBoundary + space) : 0,
        y: direction === 'column' ? -index.current * (realBoundary + space) : 0,
        cursor: 'default'
    }, []);

    const loopNext = useRef<{ index: number, x: number, y: number } | null>(null);

    const goto = useCallback((newIndex?: number) => {
        if (typeof newIndex === 'number') {
            const childrenLen = children instanceof Array ? children.length : 1;
            index.current = (loop ? 2 : 0) + (newIndex >= 0 ? (newIndex % childrenLen ): (childrenLen + ((newIndex % childrenLen) || -3)));
        }
        setSlider({
            x: direction === 'row' ? -index.current * (realBoundary + space) : 0,
            y: direction === 'column' ? -index.current * (realBoundary + space) : 0,
        });
    }, [loop, children, width, height, size, setSlider, direction]);
    
    useEffect(() => {
        goto();
    }, [goto]);

    const timer = useRef<number | null>(null);
    const startTimer = useCallback(() => {
        if (typeof autoplay !== 'number' && autoplay !== true) return;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            goto((loop ? -2 : 0) + (index.current < viewsNum - (loop ? 3 : 1) ? index.current + 1 : loop ? 2 : 0));
            startTimer();
        }, autoplay === true ? 10000 : autoplay > 3000 ? autoplay : 3000);
    }, [autoplay, goto, loop]);
    
    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);
        if (typeof autoplay === 'number' || autoplay === true) startTimer();
        return () => {
            if (timer.current) clearTimeout(timer.current);
        }
    }, [startTimer]);

    const bind = useCallback(useGesture({
        onDrag: ({ down, movement: [mx, my], direction: [xDir, yDir], distance, cancel }) => {
            const dir = direction === 'row' ? xDir : yDir;
            if (down && distance > realBoundary / 2.5) {
                let nextIndex;
                if (circular) {
                    nextIndex = index.current + (dir > 0 ? -1 : 1);
                    if (nextIndex === -1) nextIndex = viewsNum - 1;
                    else if (nextIndex === viewsNum) nextIndex = 0;
                } else nextIndex = clamp(index.current + (dir > 0 ? -1 : 1), loop ? 1 : 0, viewsNum - (loop ? 2 : 1));
                cancel?.();
                index.current = nextIndex;
                if (loop && (nextIndex === 1 || nextIndex === viewsNum - 2))
                    loopNext.current = { index: nextIndex === 1 ? viewsNum - 3 : 2, x: 0, y: 0 }
            }
            if (loop && loopNext.current && down) return;
            setViews((_) => ({ scale: down && scaleInDrag ? 1 - distance / realBoundary / 2 : 1 }));
            setSlider({
                x: direction === 'row' ? -index.current * (realBoundary + space) + (down ? mx : 0) : 0,
                y: direction === 'column' ? -index.current * (realBoundary + space) + (down ? my : 0): 0,
                cursor: down ? 'pointer' : 'default',
                onChange: loop && loopNext.current ? ({ x, y }: { x: number, y: number}) => {
                    loopNext.current![direction === 'row' ? 'x' : 'y'] = (direction === 'row' ? x : y) + index.current * (realBoundary + space);
                } : undefined
            });
        },
        onDragStart: async () => {
            if (timer.current) clearTimeout(timer.current);
            if (loop && loopNext.current) {
                const { index: loopNextIndex, x, y } = loopNext.current;
                await setSlider(({
                    x: direction === 'row' ? -loopNextIndex * (realBoundary + space) + x : 0,
                    y: direction === 'column' ? -loopNextIndex * (realBoundary + space) + y : 0,
                    immediate: true }));
                index.current = loopNextIndex;
                loopNext.current = null;
            }
        },
        onDragEnd:() => {
            if (autoplay) startTimer();
        }
    }), [circular, loop, size, width, height, children, direction, autoplay]);

    useImperativeHandle(method, () => ({ goto }));

    return (
        <Container
            ref={ref}
            {...(enableDrag ? bind() : undefined)}
            {...props}
            scaleInDrag={scaleInDrag}
            size={realSize}
            direction={direction}
            space={space}
        >
            <Slider style={sliderStyle}>
                {Array.from({ length: viewsNum }).map((_, i) =>
                    <Views key={i} style={views}>
                        {children instanceof Array ? (children as React.ReactNodeArray)[
                            !loop ? i :
                                i <= 1 ? children.length + i - 2 :
                                    i >= viewsNum - 2 ? i - children.length - 2                                                                                         
                                        : i - 2
                        ] : children}
                    </Views>
                )} 
            </Slider>
        </Container>
    );
});

SwiperViews.defaultProps = {
    size: 1,
    scaleInDrag: true,
    direction: 'row',
    enableDrag: true,
    autoplay: false
} as Props;

export default SwiperViews;