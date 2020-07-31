import { Props } from './index';
import { isLegalCSSLengthUnit, isLegalCSSColor } from '../_utils';

export function getWidth({ size }: Props) {
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string' && isLegalCSSLengthUnit(size)) return size;
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.width)) {
        if (typeof size.width === 'number') return `${size.width}px`;
        else return size.width;
    }
    return '32px';
}

export function getHeight({ size }: Props) {
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string' && isLegalCSSLengthUnit(size)) return size;
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.height)) {
        if (typeof size.height === 'number') return `${size.height}px`;
        else return size.height;
    }
    return '32px';
}

export function getColor({ color }: Props) {
    if (typeof color === 'string' && isLegalCSSColor(color)) return color;
    return '#666';
}