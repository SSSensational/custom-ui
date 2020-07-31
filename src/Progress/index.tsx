import React, { forwardRef, useRef, HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring'
import { XOR, StyledProps, OverWrite } from '../_types';
import { getTrailColor, getStrokeColor, getLinearWidth, getLinearHeight, getLinearBorderRadius, getFontColor, getCircularSize, getCircularStrokeWidth, getFontSize, getContentPos } from './util';

export interface Color {
    strokeColor: string;
    trailColor?: string;
    fontColor?: string;
}

type BaseProps = OverWrite<HTMLAttributes<HTMLDivElement> & Partial<StyledProps>, {
    color?: Color | string;
    percent?: number;
    placement?: 'none' | 'center' | 'left' | 'right' | 'top' | 'bottom';
    format?: (percent: number) => string;
}>

export interface CircularProps extends BaseProps {
    circular?: true;
    size?: { size: number | string, strokeWidth: number | string, fontSize?: number | string };
}

export interface LinearProps extends BaseProps {
    linear?: true;
    size?: { width: number | string, height: number | string, borderRadius?: number | string, fontSize?: number | string };
    fullWidth?: boolean;
}

export type Props = XOR<CircularProps, LinearProps>;

const Content = styled(animated.span)`
    position: absolute;
    line-height: 1.5em;
    white-space: nowrap;
`;

const LinearFill = styled(animated.div)`
    height: 100%;
`;

const LinearContainer = styled.div<LinearProps>`
    position: relative;
    width: ${(props) => getLinearWidth(props)};
    height: ${(props) => getLinearHeight(props)};
    border-radius: ${(props) => getLinearBorderRadius(props)};
    background: ${(props) => getTrailColor(props)};
    > ${LinearFill} {
        border-radius: ${(props) => getLinearBorderRadius(props)};
        background: ${(props) => getStrokeColor(props as Props)};
    }
    > ${Content} {
        left: ${(props) => getContentPos(props).left};
        top: ${(props) => getContentPos(props).top};
        transform: ${(props) => getContentPos(props).transform};
        font-size: ${(props) => getFontSize(props)};
        color: ${(props) => getFontColor(props)};
    }
`;

const CircularBackground = styled.path`
    fill: none;
`;

const CircularFill = styled(animated.path)`
    fill: none;
`;

const CircularContainer = styled.div<CircularProps>`
    position: relative;
    width: ${(props) => getCircularSize(props)};
    height: ${(props) => getCircularSize(props)};
    color: ${(props) => getFontColor(props)};
    ${CircularFill} {
        stroke-width: ${(props) => getCircularStrokeWidth(props)};
        stroke: ${(props) => getStrokeColor(props)};
    }
    ${CircularBackground} {
        stroke-width: ${(props) => getCircularStrokeWidth(props)};
        stroke: ${(props) => getTrailColor(props)};
    }
    > ${Content} {
        left: ${(props) => getContentPos(props).left};
        top: ${(props) => getContentPos(props).top};
        transform: ${(props) => getContentPos(props).transform};
        font-size: ${(props) => getFontSize(props)};
        color: ${(props) => getFontColor(props)};
    }
`;


const svgPath = "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831";

const Progress = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({ linear, circular, percent = 0, format, placement, ... props }, ref) => {
    const usedPercent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
    const styles = useSpring({ percent: usedPercent, width: `${percent}%`, otherStroke: `${percent}, 100`  });

    if (linear || (!linear && !circular))
        return (
            <LinearContainer ref={ref} {...props}  placement={placement} linear={!linear && !circular ? true : linear} circular={circular}>
                <LinearFill style={{ width: styles.width }}></LinearFill>
                {placement !== 'none' && <Content>{styles.percent.to(x => typeof format === 'function' ? format(Number(x.toFixed(0))) : `${x.toFixed(0)}%`)}</Content>}
            </LinearContainer>
        );
    return (
        <CircularContainer ref={ref} {...props} placement={placement} linear={!linear && !circular ? true : linear} circular={circular}>
            <svg viewBox="0 0 36 36">
                <CircularBackground d={svgPath}></CircularBackground>
                <CircularFill d={svgPath} strokeDasharray={styles.otherStroke}></CircularFill>
            </svg>
            {placement !== 'none' && <Content>{styles.percent.to(x => typeof format === 'function' ? format(Number(x.toFixed(0))) : `${x.toFixed(0)}%`)}</Content>}
        </CircularContainer>
    );
});

export default Progress;