import { Props } from './index';
import { isLegalCSSLengthUnit, isLegalCSSColor } from '../_utils';

export function getFontSize({ size }: Props) {
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string' && isLegalCSSLengthUnit(size)) return size;
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.fontSize)) {
        if (typeof size.fontSize === 'number') return `${size.fontSize}px`;
        else return size.fontSize;
    }
    return '16px';
}

export function getWidth({ size, fullWidth }: Props) {
    if (fullWidth) return '100%';
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.width)) {
        if (typeof size.width === 'number') return `${size.width}px`;
        else return size.width;
    };
    return '15em';
}

export function getHeight({ size, variant }: Props) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.height)) {
        if (typeof size.height === 'number') return `${size.height}px`;
        else return size.height;
    };
    return variant === 'standard' ? 'fit-content' : '3em';
}

export function getPadding({ size, variant, label }: Props) {
    let top, right, left, bottom;
    if (typeof size === 'object' && size.padding instanceof Array) {
        if (size.padding.length <=2) {
            if (isLegalCSSLengthUnit(size.padding[0])) bottom = top = `${size.padding[0]}${typeof size.padding[0] === 'number' ? 'px' : ''}`;
            else bottom = top = '.5em';
            if (isLegalCSSLengthUnit(size.padding[1])) left = right = `${size.padding[1]}${typeof size.padding[1] === 'number' ? 'px' : ''}`;
            else left = right = variant === 'standard' ? '0px' : label ? '1em' : '.75em';
        } else {
            if (isLegalCSSLengthUnit(size.padding[0])) top = `${size.padding[0]}${typeof size.padding[0] === 'number' ? 'px' : ''}`;
            else top = '.5em';
            if (isLegalCSSLengthUnit(size.padding[1])) right = `${size.padding[1]}${typeof size.padding[1] === 'number' ? 'px' : ''}`;
            else right = variant === 'standard' ? '0px' : label ? '1em' : '.75em';
            if (isLegalCSSLengthUnit(size.padding[2])) bottom = `${size.padding[2]}${typeof size.padding[2] === 'number' ? 'px' : ''}`;
            else bottom = '.5em';
            if (isLegalCSSLengthUnit(size.padding[3])) left = `${size.padding[3]}${typeof size.padding[3] === 'number' ? 'px' : ''}`;
            else left = variant === 'standard' ? '0px' : label ? '1em' : '.75em';
        }
    } else {
        top = bottom = '.5em';
        if (variant === 'standard') left = right = '0px'
        else left = right = label ? '1em' : '.75em';
    }
    return {
        value: `${top} ${right} ${bottom} ${left}`,
        top,
        right,
        left,
        bottom
    }
}

export function getFocusColor({ focusColor, error, errorColor }: Props) {
    if (error && typeof errorColor === 'object' && errorColor !== null && errorColor.focus) {
        if (errorColor?.color && isLegalCSSColor(errorColor?.color)) return errorColor.color;
        return 'red';
    }
    if (typeof focusColor === 'string' && isLegalCSSColor(focusColor)) return focusColor;
    return '#26a69a';
}

export function getColor({ color, error, errorColor }: Props) {
    if (error && typeof errorColor === 'object' && errorColor !== null && errorColor.all) {
        if (errorColor?.color && isLegalCSSColor(errorColor?.color)) return errorColor.color;
        return 'red';
    }
    if (typeof color === 'string' && isLegalCSSColor(color)) return color;
    return 'rgba(0, 0, 0, .4)';
}

export function getErrorColor({ errorColor }: Props) {
    if (typeof errorColor === 'object' && errorColor !== null) {
        if (errorColor?.color && isLegalCSSColor(errorColor?.color)) return errorColor.color;
        return 'red';
    }
    if (typeof errorColor === 'string' && isLegalCSSColor(errorColor)) return errorColor;
    return 'red';
}

export function getBorderLeft({ variant, iconInnerBorder, iconBefore }: Props) {
    if (variant === 'standard' && iconBefore && !iconInnerBorder) return 'calc(1.4em + 8px)';
    return '0px';
}

export function getHelperLeft({ helperPlacement, ...props }: Props) {
    return helperPlacement && helperPlacement.includes('left') ? `calc(-${getPadding(props).left} * 2)` : helperPlacement && helperPlacement.includes('center') ? '50%' : 'unset';
}

export function getHelperRight({ helperPlacement, ...props }: Props) {
    return helperPlacement && helperPlacement.includes('right') ? `calc(-${getPadding(props).right} * 2)` : 'unset';
}

export function getHelperTop({ helperPlacement, variant }: Props) {
    return helperPlacement && helperPlacement.includes('top') ? variant === 'standard' ? '-1.35em' : '-1.7em' : 'unset';
}

export function getHelperBottom({ helperPlacement }: Props) {
    return helperPlacement && helperPlacement.includes('bottom') ? '-1.7em' : 'unset';
}

export function getHelperTransform({ helperPlacement }: Props) {
    return helperPlacement && helperPlacement.includes('center') ?  'translateX(-50%)' : 'unset';
}

export function getLabelTransform({ variant, iconBefore, iconInnerBorder }: Props) {
    return `translate(${iconBefore && ((variant === 'outlined' && iconInnerBorder ===  undefined) || iconInnerBorder) ? 'calc(-1.4em - 8px)' : '0px'}, ${variant === 'standard' ? 'calc(-1em + 4px)' : '-.5em'}) scale(0.8)`;
}