import React from 'react';
import styled, { keyframes } from 'styled-components';
import Color from 'color';

const topFirst = keyframes`
    0% {transform:rotateX(90deg);opacity:0;}
    6% {transform:rotateX(0deg);opacity:1;}
    50% {transform:rotateX(0deg);opacity:1;}
    79% {transform:rotateX(0deg);opacity:0;}
    100% {transform:rotateX(0deg);opacity:0;}
`;

const topSecond = keyframes`
    0% {transform:rotateY(90deg);opacity:0;}
    18% {transform:rotateY(90deg);opacity:0;}
    23% {transform:rotateY(0deg);opacity:1;}
    58% {transform:rotateY(0deg);opacity:1;}
    87% {transform:rotateY(0deg);opacity:0;}
    100% {transform:rotateY(0deg);opacity:0;}
`;

const topThird = keyframes`
    0% {transform:rotateY(90deg);opacity:0;}
    23% {transform:rotateY(90deg);opacity:0;}
    29% {transform:rotateY(0deg);opacity:1;}
    67% {transform:rotateY(0deg);opacity:1;}
    96% {transform:rotateY(0deg);opacity:0;}
    100% {transform:rotateY(0deg);opacity:0;}
`;

const middleFirst = keyframes`
    0% {transform:rotateX(90deg);opacity:0;}
    6% {transform:rotateX(90deg);opacity:0;}
    12% {transform:rotateX(0deg);opacity:1;}
    58% {transform:rotateX(0deg);opacity:1;}
    87% {transform:rotateX(0deg);opacity:0;}
    100% {transform:rotateX(0deg);opacity:0;}
`;

const middleSecond = keyframes`
    0% {transform:rotateX(90deg);opacity:0;}
    29.4% {transform:rotateX(90deg);opacity:0;}
    35.4% {transform:rotateX(0deg);opacity:1;}
    67% {transform:rotateX(0deg);opacity:1;}
    96% {transform:rotateX(0deg);opacity:0;}
    100% {transform:rotateX(0deg);opacity:0;}
`;

const bottomFirst = keyframes`
    0% {transform:rotateX(90deg);opacity:0;}
    12% {transform:rotateX(90deg);opacity:0;}
    18% {transform:rotateX(0deg);opacity:1;}
    67% {transform:rotateX(0deg);opacity:1;}
    96% {transform:rotateX(0deg);opacity:0;}
    100% {transform:rotateX(0deg);opacity:0;}
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`;

const Square: any = styled.div<{ color: string }>`
    display: inline-block;
    border: none;
    width: 33.33%;
    height: 101%;
    opacity: 0;
    background-color: ${({ color }) => color};
    transform-origin: 0 0;
    animation-duration: 2.4s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
`;

const TopFirst = styled(Square)`
    animation-name: ${topFirst};
`;

const TopSecond = styled(Square)`
    background-color: ${({ color }) => color === 'currentColor' || color === 'currentcolor' ? color : Color(color).opaquer(-.2).toString()};
    animation-name: ${topSecond};
`;

const TopThird = styled(Square)`
    background-color: ${({ color }) => color === 'currentColor' || color === 'currentcolor' ? color : Color(color).opaquer(-.2).toString()};
    animation-name: ${topThird};
`;

const MiddleFirst = styled(Square)`
    animation-name: ${middleFirst};
`;

const MiddleSecond = styled(Square)`
    background-color: ${({ color }) => color === 'currentColor' || color === 'currentcolor' ? color : Color(color).opaquer(-.4).toString()};
    animation-name: ${middleSecond};
`;

const BottomFirst = styled(Square)`
    animation-name: ${bottomFirst};
`;

const BoardFlip: React.FC<{ color: string }> = ({ color }) => (
    <BoardContainer>
        <Row>
            <TopFirst color={color}/>
            <TopSecond color={color}/>
            <TopThird color={color}/>
        </Row>
        <Row>
            <MiddleFirst color={color}/>
            <MiddleSecond color={color}/>
        </Row>
        <Row>
            <BottomFirst color={color}/>
        </Row>
    </BoardContainer>
);

export default BoardFlip;