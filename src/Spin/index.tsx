import React, { PropsWithChildren, HTMLAttributes, memo, isValidElement, createElement } from 'react';
import styled from 'styled-components';
import { getColor, getSize } from './util';
import { StyledProps, OverWrite } from '../_types';
import BallDash from './BallDash';
import BallRing from './BallRing';
import BallBounce from './BallBounce';
import BallSpin from './BallSpin';
import BallSpinStretch from './BallSpinStretch';
import BallTrail from './BallTrail';
import BallTwo from './BallTwo';
import Bar from './Bar';
import BoardFlip from './BoardFlip';
import BoxFlip from './BoxFlip';
import BoxSpinFill from './BoxSpinFill';
import DotFade from './DotFade';
import DotsFade from './DotsFade';
import DotSwing from './DotSwing';
import DotWave from './DotWave';

const typeMap = {
    'ball-dash': BallDash,
    'ball-ring': BallRing,
    'ball-bounce': BallBounce,
    'ball-spin': BallSpin,
    'ball-spin-stretch': BallSpinStretch,
    'ball-trail': BallTrail,
    'ball-two': BallTwo,
    'bar': Bar,
    'board-flip': BoardFlip,
    'box-flip': BoxFlip,
    'box-spin-fill': BoxSpinFill,
    'dot-fade': DotFade,
    'dots-fade': DotsFade,
    'dot-swing': DotSwing,
    'dot-wave': DotWave,
};

export type Type = keyof typeof typeMap;

export type Props = OverWrite<HTMLAttributes<HTMLDivElement> & Partial<StyledProps>, {
    type: Type;
    size?: number | string;
    color?: string;
}>;

const Container = styled.div<Props>`
    all: unset;
    position: relative;
    display: inline-block;
    width: ${props => getSize(props)};
    height: ${props => getSize(props)};
    font-size: ${props => getSize(props)};
    color: ${props => getColor(props)};
    & > :nth-child(1) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
`;


const Spin = ({ type, ...props}: PropsWithChildren<Props>) => (   
    <Container {...props}>
        {!isValidElement(typeMap[type]) ? createElement(typeMap[type as 'ball-spin-stretch'], { color: props.color }) : typeMap[type]}
    </Container>
);


Spin.defaultProps = {
    size: 32,
    type: 'bar',
    color: 'currentColor',
};

export default memo(Spin);