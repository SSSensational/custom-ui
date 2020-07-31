import { Props, CircularProps, LinearProps } from './index';
import { isLegalCSSLengthUnit, isLegalCSSColor } from '../_utils';

export function getStrokeColor({ color }: Props) {
    if (typeof color === 'string' && isLegalCSSColor(color)) return color;
    if (typeof color === 'object' && isLegalCSSColor(color?.strokeColor)) return color?.strokeColor;
    return '#1890ff';
}

export function getTrailColor({ color }: Props) {
    if (typeof color === 'object' && isLegalCSSColor(color?.trailColor)) return color?.trailColor;
    return 'rgba(0, 0, 0, 0.1)';
}

export function getFontColor({ color }: Props) {
    if (typeof color === 'object' && isLegalCSSColor(color?.fontColor)) return color?.fontColor;
    return '#000';
}

export function getFontSize({ size }: Props) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size?.fontSize)) {
        if (typeof size?.fontSize === 'number') return `${size?.fontSize}px`;
        return size?.fontSize;
    }
    return 'inherit';
}

export function getLinearWidth({ size }: LinearProps) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size?.width)) {
        if (typeof size?.width === 'number') return `${size?.width}px`;
        return size?.width;
    }
    return '200px';
}

export function getLinearHeight({ size }: LinearProps) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size?.height)) {
        if (typeof size?.height === 'number') return `${size?.height}px`;
        return size?.height;
    }
    return '8px';
}

export function getLinearBorderRadius({ size }: LinearProps) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size?.borderRadius)) {
        if (typeof size?.borderRadius === 'number') return `${size?.borderRadius}px`;
        return size?.borderRadius;
    }
    return '4px';
}

export function getCircularSize({ size }: CircularProps) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size?.size)) {
        if (typeof size?.size === 'number') return `${size?.size}px`;
        return size?.size;
    }
    return '100px';
}


export function getCircularStrokeWidth({ size }: CircularProps) {
    let res = '8px';
    if (typeof size === 'object' && isLegalCSSLengthUnit(size?.strokeWidth)) {
        if (typeof size?.strokeWidth === 'number') res = `${size?.strokeWidth}px`;
        res = size?.strokeWidth as string;
    }
    return `calc(${res} / ${parseInt(typeof size === 'object' && size.size ? String(size?.size) : '100') / 36})`;
}

export function getContentPos({ linear, circular, placement }: Props) {
    if (placement === 'center' || (circular && !placement)) return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    if (placement === 'bottom') return { left: '50%', top: '100%', transform: 'translate(-50%, 0)' };
    if (placement === 'left') return { left: '0', top: '50%', transform: 'translate(calc(-100% - .5em), -50%)' };
    if (placement === 'right' || (linear && !placement)) return { left: '100%', top: '50%', transform: 'translate(.5em, -50%)' };
    if (placement === 'top') return { left: '50%', top: '0', transform: 'translate(-50%, -100%)' };
    return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
}
