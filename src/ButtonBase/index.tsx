import React, { forwardRef, PropsWithChildren, ButtonHTMLAttributes, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { composeRef } from '../_utils';
import { OverWrite, XOR, StyledProps } from '../_types';
import { getFontSize, getWidth, getHeight, getPadding, getBorderWidth, getBorderRadius, getBoxShadow, getColor, getBgColor, getBorderColor, getHoverColor, getHoverBgColor, getHoverBorderColor, getHoverBoxShadow } from './util';

export interface Color {
    color: string;
    bgColor?: string;
    borderColor?: string;
    hoverColor?: string;
    hoverBgColor?: string;
    hoverBorderColor?: string;
}

export interface CustomSizeWithPadding {
    padding: [number | string, number | string];
    fontSize?: number | string;
}

export interface CustomSizeWithWidth {
    width: number | string;
    height: number | string;
    fontSize?: number | string;
}

type CustomSize = XOR<CustomSizeWithPadding, CustomSizeWithWidth>;

type ButtonProps = OverWrite<ButtonHTMLAttributes<HTMLButtonElement>, {
    variant?: 'text' | 'outlined' | 'contained';
    size?: 'large' | 'big' | 'normal' | 'small' | number | string | CustomSize;
    color?: Color | string;
    fullWidth?: boolean;
    borderRadius?: boolean | number | string | 'circle';
    borderWidth?: string | number;
    borderStyle?: 'dashed' | 'dotted' | 'double' | 'groove' | 'hidden' | 'inherit' | 'initial' | 'inset' | 'none' | 'outset' | 'solid' | 'unset';
    boxShadow?: boolean | string;
    hoverBoxShadow?: boolean | string;
}>;

export type Props = XOR<ButtonProps, ButtonProps & StyledProps>


const Button = styled.button<ButtonProps>`
    all: unset;
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    outline: none;
    border-style: none;
    user-select: none;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    border-style: solid;
    user-select: none;
    overflow: hidden;
    cursor: pointer;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: ${props => getWidth(props)};
    height: ${props => getHeight(props)};
    padding: ${props => getPadding(props)};
    color: ${props => getColor(props)};
    font-size: ${props => getFontSize(props)};
    border-width: ${props => getBorderWidth(props)};
    border-radius: ${props => getBorderRadius(props)};
    border-color: ${props => getBorderColor(props)};
    border-style: ${props => props.borderStyle || 'solid'};
    background-color: ${props => getBgColor(props)};
    box-shadow: ${props => getBoxShadow(props)};
    &:hover, &:focus {
        &:not([disabled]) {
            color: ${props => getHoverColor(props)};
            border-color: ${props =>  getHoverBorderColor(props)};
            background-color: ${props =>  getHoverBgColor(props)};
            box-shadow: ${props =>  getHoverBoxShadow(props)};
        }
    }
    &[disabled] {
        opacity: .6;
        cursor: not-allowed;
    }
`;


const ButtonBase = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(({ children, onMouseLeave, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleBlur = useCallback((e) => {
        buttonRef.current?.blur();
        onMouseLeave?.(e);
    }, [onMouseLeave]);

    return (
        <Button ref={composeRef(buttonRef, ref)}  {...props} onMouseLeave={handleBlur}>
            {children}
        </Button>
    );
});

ButtonBase.defaultProps = {
    size: 'normal',
    variant: 'outlined',
    color: '#000',
    borderRadius: true,
};

export default ButtonBase;