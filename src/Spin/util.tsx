import { Props } from './index';
import { isLegalCSSLengthUnit, isLegalCSSColor } from '../_utils';

export function getSize({ size }: Props) {
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string' && isLegalCSSLengthUnit(size)) return size;
    return '32px';
}

export function getColor({ color }: Props) {
    if (typeof color === 'string' && isLegalCSSColor(color)) return color;
    return 'currentColor';
}