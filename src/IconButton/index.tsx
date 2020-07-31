import React, { PropsWithChildren } from 'react';
import { XOR, OverWriteOmit } from '../_types';
import { isLegalCSSLengthUnit } from '../_utils';
import Button, { Props as ButtonProps } from '../Button';
import Icon from '../Icon';

type CustomColor = {
    buttonColor: string;
    iconColor: string;
}

type IconButtonProps = OverWriteOmit<ButtonProps, {
    src: string;
    variant: 'contained' | 'incent';
    color: string | CustomColor;
}, 'fullWidth' | 'borderRadius' | 'variant' | 'color' | 'size'>

interface SizeWithRatio extends IconButtonProps {
    size: number | string;
    ratio: number;
}

interface SizeCustom extends IconButtonProps {
    size: {
        iconWidth: number | string;
        iconHeight: number | string;
        buttonSize: number | string;
    },
}


export type Props = XOR<SizeWithRatio, SizeCustom>;

function getIconSize(size: number | string, ratio: number) {
    ratio = ratio < 0 || ratio > 1  ? .55 : ratio;
    if (!isLegalCSSLengthUnit(size)) return '28px';
    if (typeof size === 'number') return size * ratio;
    const sizeNumber = parseFloat(size);
    return `${sizeNumber * ratio}${size.slice(String(sizeNumber).length)}`;
}

const IconButton = ({ children, src, variant, color, size, ratio, rippleCenter, ...props }: PropsWithChildren<Props>) => {
    const btnSize = typeof size === 'object' ? size.buttonSize : size;
    return (
        <Button
            size={{ width: btnSize, height: btnSize }}
            variant={variant === 'incent' ? "text" : 'contained'}
            borderRadius="circle"
            color={typeof color === 'object' ? color.buttonColor : color}
            rippleCenter={typeof rippleCenter === 'boolean' ? rippleCenter : variant === 'incent'}
            {...props}
        >
            <Icon
                src={src}
                size={typeof size === 'object' ? { width: size.iconWidth, height: size.iconHeight } : getIconSize(size, ratio as number)} 
                color={typeof color === 'object' ? color.iconColor : variant === 'contained' ? '#fff' : color}
                style={{ display: 'block' }}
            />
        </Button>
    );
}



IconButton.defaultProps = {
    variant: 'incent',
    color: '#666',
    size: 48,
    ratio: .55,
};


export default IconButton;