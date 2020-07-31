import React, { cloneElement, useRef, HTMLAttributes, CSSProperties } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring'
import { transitionAnimation, TransitionAnimationType } from '../Animation';
import { StyledProps, OverWrite } from '../_types';

export interface ItemProps {
    key: string | number;
    animationType?: TransitionAnimationType;
    animationDuration?: number | { enter: number, leave: number };
    ItemWrapperClassName?: string;
    ItemWrapperStyle?: CSSProperties;
}

export type Props<T> = OverWrite<HTMLAttributes<HTMLDivElement> & Partial<StyledProps>, {
    list: T[];
    children: (item: T) => JSX.Element;
    animatedHeight?: boolean;
    animationType?: TransitionAnimationType;
    animationDuration?: number | { enter: number, leave: number };
    ItemWrapperClassName?: string;
    ItemWrapperStyle?: CSSProperties;
}>;

const Container = styled.div`
`;

const Item = styled(animated.div)`
    width: fit-content;
    background-color: transparent;
    transform-origin: center;
    backface-visibility: visible;
    overflow: visible;
    will-change: transform;
    pointer-events: auto;
`;

const ItemHeightWrapper = styled(animated.div)`
    width: fit-content;
    will-change: height;
`;

const List = <T extends ItemProps>({ list, children, animatedHeight, animationType = 'zoom', animationDuration, ItemWrapperClassName, ItemWrapperStyle, ...props}: Props<T>) => {
    const heightMap = useRef(new WeakMap());
    const render = useTransition(list, {
        keys:  (item: T) => item.key,
        from: (item: T) => ({
            ...transitionAnimation[item?.animationType ?? animationType].from,
            height: animatedHeight ? 0 : undefined
        }),
        enter: (item: T) => async next => await next({ 
                ...transitionAnimation[item?.animationType ?? animationType].enter, 
                height: animatedHeight ? heightMap.current.get(item) : undefined,
                config: { 
                    ...transitionAnimation[item?.animationType ?? animationType].enter?.config,
                    duration: typeof (item?.animationDuration ?? animationDuration) === 'object' ? 
                        ((item?.animationDuration ?? animationDuration) as { enter: number, leave: number })?.enter
                            : (item?.animationDuration ?? animationDuration)
                }
        }),
        leave: (item: T) => ({
            ...transitionAnimation[item?.animationType ?? animationType].leave,
            height: animatedHeight ? 0 : undefined,
            margin: 0,
            overflow: 'hidden',
            config: { 
                ...transitionAnimation[item?.animationType ?? animationType].leave?.config,
                duration: typeof (item?.animationDuration ?? animationDuration) === 'object' ? 
                    ((item?.animationDuration ?? animationDuration) as { enter: number, leave: number })?.leave
                        : (item?.animationDuration ?? animationDuration)
            }
        }),
    });
    
    return (
        <Container {...props}>
            {render((style, item) =>
                <Item
                    className={item?.ItemWrapperClassName ?? ItemWrapperClassName ?? ''}
                    style={{ ...(item?.ItemWrapperStyle ?? ItemWrapperStyle), ...style }}
                >
                    {animatedHeight ?
                        <ItemHeightWrapper ref={r => heightMap.current?.set(item, r?.offsetHeight)}>
                            {cloneElement(children(item))}
                        </ItemHeightWrapper>
                            : cloneElement(children(item))
                    }
                </Item>
            )}
        </Container>
    );
};

export default List;