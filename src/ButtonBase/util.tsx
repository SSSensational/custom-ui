import Color from 'color';
import { Props } from './index';
import { isLegalCSSLengthUnit, isLegalCSSColor, isMobile } from '../_utils';

const styles = {
    size: {
        large: '24px',
        big: '20px',
        normal: '16px',
        small: '12px',
    },
    defaultColor: '#000',
    defaultRadius: 4,
    defaultBoxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    defaultHoverBoxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
}

export function getFontSize({ size }: Props) {
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string') {
        if (styles.size[size as 'large']) return styles.size[size as 'large'];
        if (isLegalCSSLengthUnit(size)) return size;
        else return '16px';
    };
    if (typeof size === 'object') {
        if (size.fontSize) {
            if (typeof size.fontSize === 'number') return `${size.fontSize}px`;
            else if (isLegalCSSLengthUnit(size.fontSize)) return size.fontSize;
            else return '16px';
        }
        else return '16px';
    }
    return '16px';
}

export function getWidth({ size, fullWidth }: Props) {
    if (fullWidth) return '100%';
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.width) && isLegalCSSLengthUnit(size.height)) {
        if (typeof size.width === 'number') return `${size.width}px`;
        else return size.width;
    };
    return '';
}

export function getHeight({ size }: Props) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.width) && isLegalCSSLengthUnit(size.height)) {
        if (typeof size.height === 'number') return `${size.height}px`;
        else return size.height;
    };
    return '';
}

export function getPadding({ size, variant, borderWidth }: Props) {
    if (typeof size === 'object' && isLegalCSSLengthUnit(size.width) && isLegalCSSLengthUnit(size.height)) return '0';
    let padding;
    if (typeof size === 'object' && size.padding && size.padding instanceof Array) {
        padding = size.padding;
        if (!isLegalCSSLengthUnit(padding[0])) padding[0] = '.6em';
        if (!isLegalCSSLengthUnit(padding[1])) padding[1] = '1em';
    }
    else padding = ['.6em', '1em']
    borderWidth = variant === 'outlined' ? isLegalCSSLengthUnit(borderWidth) ? borderWidth : '1px' : '0px';
    return `calc(${typeof padding[0] === 'number' ? padding[0] + 'px' : padding[0]} - ${borderWidth}) calc(${typeof padding[1] === 'number' ? padding[1] + 'px' : padding[1]} - ${borderWidth})`;
}

export function getBorderWidth({ variant, color, borderWidth }: Props) {
    if (variant === 'outlined' || (typeof color === 'object' && color.borderColor && color.hoverBorderColor && typeof color.bgColor === 'string' && typeof color.hoverBgColor === 'string')) {
        if (isLegalCSSLengthUnit(borderWidth)) {
            if (typeof borderWidth === 'number')return `${borderWidth}px`;
            else return borderWidth;
        } else return '1px';
    }
    return '0';
}

export function getBorderRadius({ borderRadius }: Props) {
    if (typeof borderRadius === 'number') return `${borderRadius}px`;
    if (borderRadius === 'circle') return '50%';
    if (typeof borderRadius === 'string' && isLegalCSSLengthUnit(borderRadius)) return borderRadius;
    if (borderRadius === true) return `${styles.defaultRadius}px`;
    return '0px';
}

export function getBoxShadow({ variant, boxShadow }: Props) {
    if (typeof boxShadow === 'string') return boxShadow;
    if (boxShadow === true) return styles.defaultBoxShadow;
    if (boxShadow === undefined && variant === 'contained') return styles.defaultBoxShadow;
    return '';
}

export function getRightColor(color: Props['color']) { // 如果color是字符串，正确color就是color；如果color是对象且color.color是字符串，正确color是color.color; 否则给个默认值。
    let rightColor;
    if (typeof color === 'string') rightColor = color;
    else if (typeof color === 'object') rightColor = color.color;
    return isLegalCSSColor(rightColor) ? rightColor : styles.defaultColor;
}

export function getColor({ color, variant }: Props) {
    const rightColor = getRightColor(color);
    if (variant === 'contained') {// 填充型按钮 color为颜色字符时时不代表文字颜色，代表填充色，文字颜色根据亮度强弱分为白或黑。
        if(typeof color === 'object' && isLegalCSSColor(color.bgColor) && isLegalCSSColor(color.color))
            return color.color; // 但是如果明确指定了文字颜色和背景色那就按指定的来
        return Color(rightColor).isLight() ? '#000' : '#fff'; 
    }
    return rightColor;
}

export function getBgColor({ color, variant }: Props) {
    if (typeof color === 'object' && isLegalCSSColor(color.bgColor)) return color.bgColor; // 优先级最高
    if (variant === 'text' || variant === 'outlined') return '#fff'; // 文字和边框型按钮默认背景色为白色
    else if (variant === 'contained') return getRightColor(color); // 填充型按钮背景色默认为color本身
    else return '#fff'; // 如果variant不符合格式，默认为'outlined'型按钮。
}

export function getBorderColor({ color, variant }: Props) {
    if (typeof color === 'object' && isLegalCSSColor(color.borderColor)) return color.borderColor; // 优先级最高
    if (variant === 'outlined') return Color(getRightColor(color)).opaquer(-.5).toString();// 边框按钮中边框颜色比文字颜色淡50%
    return 'transparent'; // 正常情况下只有边框类型按钮有边框，其他全当透明。
}

export function getHoverColor({ color }: Props) {
    if (isMobile) return '';
    if (typeof color === 'object' && isLegalCSSColor(color.hoverColor)) return color.hoverColor; // 优先级最高
    return ''; // 默认不变
}

export function getHoverBgColor({ color, variant }: Props) {
    if (isMobile) return '';
    if (typeof color === 'object' && isLegalCSSColor(color.hoverBgColor)) return color.hoverBgColor; // 优先级最高
    let useBgColor;
    if (typeof color === 'string' && isLegalCSSColor(color)) useBgColor = color;
    else if (typeof color === 'object') {
        if (isLegalCSSColor(color.bgColor)) useBgColor = color.bgColor;
        else if (isLegalCSSColor(color.color)) useBgColor = color.color;
        else useBgColor = styles.defaultColor;
    } else useBgColor = styles.defaultColor;
    if (variant === 'text' || variant === 'outlined') return Color(useBgColor).opaquer(-.9).toString(); // 文字和边框按钮为本身颜色淡化色
    return Color(useBgColor).isLight() ? Color(useBgColor).darken(.2).toString() : Color(useBgColor).opaquer(-.2).toString();// contained按钮为加深原本背景色
}

export function getHoverBorderColor({ color, variant }: Props) {
    if (isMobile) return '';
    if (typeof color === 'object' && isLegalCSSColor(color.hoverBorderColor)) return color.hoverBorderColor; // 优先级最高
    let useBorderColor;
    if (typeof color === 'string' && isLegalCSSColor(color)) useBorderColor = color;
    else if (typeof color === 'object' && isLegalCSSColor(color.color)) useBorderColor = color.color;
    else useBorderColor = styles.defaultColor;
    if (variant === 'outlined') return useBorderColor;
    else return 'transparent';
}

export function getHoverBoxShadow({ hoverBoxShadow, variant, boxShadow }: Props) {
    if (isMobile) return '';
    if (typeof hoverBoxShadow === 'string') return hoverBoxShadow; // 优先级最高
    if (hoverBoxShadow === true) return styles.defaultHoverBoxShadow;
    if (variant === 'contained' && boxShadow !== false && hoverBoxShadow !== false) return styles.defaultHoverBoxShadow;
    if (boxShadow === true && hoverBoxShadow === undefined) return styles.defaultHoverBoxShadow;
    return '';
}