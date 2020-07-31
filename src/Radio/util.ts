import { Props } from './index';
import { isLegalCSSLengthUnit, isLegalCSSColor } from '../_utils';

export function getSize({ size }: Props) {
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string' && isLegalCSSLengthUnit(size)) return size;
    return '16px';
}

export function getColor({ color }: Props) {
    if (typeof color === 'string' && isLegalCSSColor(color)) return color;
    return '#3E4DA7';
}

export function getMargin({ labelPlacement, interactive, labelDistance }: Props) {
    let distance;
    if (typeof labelDistance === 'number') distance = `${labelDistance}px`;
    if (typeof labelDistance === 'string' && isLegalCSSLengthUnit(labelDistance)) distance = labelDistance;
    if (interactive === true) return '';
    if (labelPlacement === 'right') return `0 ${distance} 0 0`;
    if (labelPlacement === 'left') return `0 0 0 ${distance}`;
    if (labelPlacement === 'bottom') return `0 0 ${distance} 0`;
    if (labelPlacement === 'top') return `${distance} 0 0 0`;
    return '';
}

export function getFlexDirection({ labelPlacement }: Props) {
    if (labelPlacement === 'right') return 'row';
    if (labelPlacement === 'left') return 'row-reverse';
    if (labelPlacement === 'bottom') return 'column';
    if (labelPlacement === 'top') return 'column-reverse';
    return 'row';
}