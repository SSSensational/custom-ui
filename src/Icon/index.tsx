import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';
import { OverWrite } from '../_types';
import { getWidth, getHeight, getColor } from './util';

export interface CustomSize {
    width: number | string;
    height: number | string;
}

export type Props = OverWrite<ImgHTMLAttributes<HTMLImageElement>, {
    src: string | React.ReactElement;
    size?: number | string | CustomSize;
    color?: string;
}>


const Icon = styled.span<Props>`
    display: inline-block;
    flex-shrink: 0;
    flex-grow: 0;
    width: ${(props) => getWidth(props)};
    height: ${(props) => getHeight(props)};
    mask: ${({ src }) => `url('${src}') no-repeat`};
    mask-size: 100% 100%;
    background-color: ${(props) => getColor(props)};
    transition: background-color .2s cubic-bezier(0.0, 0, 0.2, 1);
`;

export default Icon;