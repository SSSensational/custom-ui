import React, { useState, useRef, useCallback, PropsWithChildren, InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import Color from 'color';
import Icon from '../Icon';
import Ripple from '../Ripple';
import { useFormProps, Rule } from '../Form/context';
import { uniqueId, composeRef } from '../_utils';
import { OverWrite, OverWriteOmit } from '../_types';
import { getFontSize, getWidth, getHeight, getPadding, getBorderLeft, getFocusColor, getColor, getErrorColor, getHelperLeft, getHelperBottom, getHelperRight, getHelperTop, getHelperTransform, getLabelTransform } from './util';
const clear = require('./clear.svg') as string;
const revealOff = require('./reveal-off.svg') as string;
const revealOn = require('./reveal-on.svg') as string;

export interface CustomSize {
    width?: number | string;
    height?: number | string;
    padding?: [number | string, number | string] | [number | string, number | string, number | string, number | string];
    fontSize: number | string;
}

export type Props = OverWriteOmit<InputHTMLAttributes<HTMLInputElement>, {
    id?: string;
    variant?: 'standard' | 'outlined';
    color?: string;
    focusColor?: string;
    fullWidth?: boolean;
    size?: CustomSize | number | string;
    label?: string;
    labelBefore?: string;
    labelAfter?: string;
    isRequired?: boolean;
    iconBefore?: string;
    iconInnerBorder?: boolean;
    helperText?: React.ReactNode;
    helperPlacement?: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-center';
    bgColor?: string;
    error?: boolean;
    errorColor?: string | { color: string, all?: boolean, focus?: boolean };
    revealable?: boolean;
    clearable?: boolean;
    rules?: Rule[];
}, 'width' | 'fontSize' | 'placeholder'>;

const IconBefore = styled(Icon)`
    width: 1.4em;
    height: 1.4em;
    margin-right: 8px;
`;

const InputField = styled.label<Props & { hasBtnAfter?: boolean }>`
    all: unset;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transition: border-color .2s cubic-bezier(0.0, 0, 0.2, 1);
    width: ${(props) => getWidth(props)};
    height: ${(props) => getHeight(props)};
    padding: ${(props) => getPadding(props).value};
    padding-right: ${({ variant, hasBtnAfter }) => variant === 'outlined' && hasBtnAfter ? '0' : ''};
    padding-top: 0;
    padding-bottom: 0;
    font-size: ${(props) => getFontSize(props)};
    color: ${(props) => getColor(props)};
    opacity: ${({ disabled }) => disabled ? .6 : 1};
    cursor: ${({ disabled }) => disabled ? 'default' : 'text'};
    &::before {  /* &::before是 边框 */
        content: ""; 
        position: absolute;
        box-sizing: border-box;  /* 让hover时的border往上变大 */
        left: ${(props) => getBorderLeft(props)};
        top: 0;
        width: ${(props) => `calc(100% - ${getBorderLeft(props)})`};
        height: 100%;
        border-style: ${({ disabled }) => disabled ? 'dashed' : 'solid'};
        border-width: ${({ variant }) => variant === 'standard' ? '0 0 1px 0' : '1px'};
        border-radius: ${({ variant }) => variant === 'standard' ? '0' : '4px'};
        border-color: ${(props) => getColor(props)};
        transition: border-color .2s cubic-bezier(0.0, 0, 0.2, 1);
    }
    &::after {    /* &::after是 无边框输入库的聚焦动效*/
        content: "";
        position: absolute;
        display: ${({ variant }) => variant === 'standard' ? '' : 'none'};
        left: ${(props) => getBorderLeft(props)};
        bottom: 0;
        width: ${(props) => `calc(100% - ${getBorderLeft(props)})`};
        border-bottom: ${(props) => `2px solid ${getFocusColor(props)}`};
        transform: scaleX(0);
        transition: transform .2s cubic-bezier(0.0, 0, 0.2, 1), border-color .2s cubic-bezier(0.0, 0, 0.2, 1);
    }
    &:hover {
        &::before {
            border-width: ${({ disabled, variant }) => disabled ? '' : variant === 'standard' ? '0 0 2px 0' : '2px'};
            border-color: ${({ disabled, ...props }) => disabled ? '' : Color(getColor(props)).opaquer(.2).toString()};
        }
    }
    &:focus-within {
        &::before {
            border-width: ${({ disabled, variant }) => disabled ? '' : variant === 'standard' ? '0 0 2px 0' : '2px'};
            border-color: ${(props) => getFocusColor(props)};
        }
        &::after {
            transform: scaleX(1);
        }
        > ${IconBefore} {
            background-color: ${(props) => getFocusColor(props)};
        }
    }
`;

const InputContainer = styled.div<Props>`
    all: unset;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: transparent;
    font-size: inherit;
    width: 100%;
    height: 100%;
    padding: ${(props) => getPadding(props).value};
    padding-left: 0;
    padding-right: 0;
`;

const Error = styled.label<Props>`
    all: unset;
    position: absolute;
    margin: 0;
    padding: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: .7em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    pointer-events: none;
    transition: opacity .2s cubic-bezier(0.0, 0, 0.2, 1);
    cursor: default;
    top: ${(props) => getHelperTop(props)};
    bottom: ${(props) => getHelperBottom(props)};
    left: ${(props) => getHelperLeft(props)};
    right:  ${(props) => getHelperRight(props)};
    transform: ${(props) => getHelperTransform(props)};
    color: ${(props) => getErrorColor(props)};
    opacity: ${({ disabled, error }) => !disabled && error ? 1 : 0};
`;

const Label = styled.label<Props>`
    all: unset;
    position: absolute;
    top: 0;
    left: ${({ variant }) => variant === 'standard' ? '0px' : '-2.5px'};
    padding: ${({ variant }) => variant === 'standard' ? '0' : '0 5.5px 0 4px'};
    text-align: initial;
    font-size: inherit;
    color: transparent;
    background-color: transparent;
    user-select: none;
    transform-origin: 0% 100%;
    transform: translate(0px, 50%) scale(1);
    transition: background-color .2s ease, transform .2s ease-out, color .2s ease-out;
    cursor: ${({ disabled }) => disabled ? 'default' : 'text'};
`;


const RevealButton = styled.label<Props & { url: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    width: ${({ variant }) => variant === 'standard' ? '2em' : '2.25em'};
    height: ${({ variant }) => variant === 'standard' ? '2em' : '2.25em'};
    margin: ${({ variant }) => variant === 'standard' ? '0 0 0 6px' : `0 8px 0 6px`};
    border-radius: 50%;
    opacity: 0;
    transition: opacity .2s cubic-bezier(0.0, 0, 0.2, 1);
    cursor: text;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    &::before {
        content: '';
        display: block;
        flex-shrink: 0;
        flex-grow: 0;
        width: 1.35em;
        height: 1.35em;
        mask: ${({ url }) => `url('${url}') no-repeat`}; 
        mask-size: 100% 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: background-color .2s cubic-bezier(0.0, 0, 0.2, 1);
    }
`;

const ClearButton = styled.label<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    width: ${({ variant }) => variant === 'standard' ? '2em' : '2.25em'};
    height: ${({ variant }) => variant === 'standard' ? '2em' : '2.25em'};
    margin: ${({ variant, revealable, type }) => (revealable && type === 'password') || variant === 'standard' ? '0 0 0 4px' : `0 8px 0 4px`};
    border-radius: 50%;
    opacity: 0;
    transition: opacity .2s cubic-bezier(0.0, 0, 0.2, 1);
    cursor: text;
    & + ${RevealButton} {
        margin-left: 0;
    }
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    &::before {
        content: '';
        display: block;
        flex-shrink: 0;
        flex-grow: 0;
        width: 1.35em;
        height: 1.35em;
        mask: url('${clear}') no-repeat; 
        mask-size: 100% 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: background-color .2s cubic-bezier(0.0, 0, 0.2, 1);
    }
`;

const InputArea = styled.input<OverWrite<Props, { size: any }>>`
    all: unset;
    flex-shrink: 1;
    width: 100%;
    height: fit-content;
    margin: 0;
    padding: 0;
    line-height: 1.15; 
    outline: none;
    border: none;
    font-size: inherit;
    background-color: transparent;
    min-width: 0;
    &::-ms-clear, &::-ms-reveal {
        display: none;
    }
    ~ ${RevealButton} {
        cursor: text;
    }
    &::placeholder {
        font-size: inherit;
        color: inherit;
        user-select: none;
        transition: color .2s ease-out;
    }
    &:not(:placeholder-shown) {
        ~${Label} {
            color: inherit;
            background-color: ${({ bgColor }) => bgColor};
            transform-origin: 0 0;
            transform: ${(props) => getLabelTransform(props)};
            cursor: default;
        }
    }
    &:focus {
        ~${Label} {
            color: ${(props) => getFocusColor(props)};
            background-color: ${({ bgColor }) => bgColor};
            transform-origin: 0 0;
            transform: ${(props) => getLabelTransform(props)};
            cursor: default;
        }
        &::placeholder {
            color: transparent;
            transition: color .2s cubic-bezier(0.0, 0, 0.2, 1), transform .2s ease-in;
        }
        ~ ${RevealButton} {
            opacity: 1;
            cursor: pointer;
        }
        &:placeholder-shown {
            ~ ${RevealButton} {
                opacity: 0;
                cursor: text;
            }
        }
        &:not(:placeholder-shown) {
            ~${ClearButton} {
                opacity: 1;
                cursor: pointer;
            }
        }
    }
    &:invalid~${Error} {
        opacity: 1;
    }
`;

const Input = forwardRef<HTMLInputElement, PropsWithChildren<Props>>((props, ref) => {
    const formedProps = useFormProps(props);
    const { id, type, className, style, variant, color, focusColor, errorColor, fullWidth, size, label, labelBefore, labelAfter, isRequired, iconBefore, iconInnerBorder, error, helperText, helperPlacement, bgColor, disabled, revealable, clearable, rules, onChange, ...nativeProps} = formedProps;
    const styledProps = { disabled, variant, color, focusColor, fullWidth, size, label, labelBefore, labelAfter, iconBefore, iconInnerBorder, error, helperText, helperPlacement, bgColor, type, revealable, clearable, errorColor };

    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useRef<string>(id || uniqueId('input'));
    const [showVisibilityBtn, setShowVisibilityBtn] = useState(false);
    const handleClickRevealBtn = useCallback(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
        setShowVisibilityBtn(pre => !pre);
    }, []);

    const handleClickClearBtn = useCallback(() => {
        if (!inputRef.current) return;
        inputRef.current.value = '';
        if (onChange) onChange({ target: inputRef.current } as React.ChangeEvent<HTMLInputElement>);
    }, [onChange]);

    return (
        <InputField className={className} style={style} htmlFor={inputId.current} hasBtnAfter={clearable || (type === 'password' && revealable)} {...styledProps} >
            {iconBefore && <IconBefore src={iconBefore} size={getFontSize(props)} color={getColor(props)}/>} 
            <InputContainer {...styledProps}>
                <InputArea
                    ref={composeRef([inputRef, ref, formedProps.formRef])}
                    id={inputId.current}
                    placeholder={`${labelBefore || ''}${label || ' '}${labelAfter || ''}${(labelBefore || label || labelAfter) && (isRequired || nativeProps.required) ? ' *' : ''}`}
                    onChange={onChange}
                    {...styledProps}
                    {...nativeProps}
                    type={type === 'password' && revealable ? showVisibilityBtn ? 'text' : 'password' : type}
                />
                {label && <Label htmlFor={inputId.current} {...styledProps}>{label}{label && (isRequired || nativeProps.required) ? ' *' : ''}</Label>}
                {helperText && <Error {...styledProps}>{helperText}</Error>}
                {clearable && <ClearButton htmlFor={inputId.current} onClick={handleClickClearBtn} {...styledProps}><Ripple center preventDupClick/></ClearButton>}
                {type === 'password' && revealable &&
                    <RevealButton htmlFor={inputId.current} onClick={handleClickRevealBtn} url={!showVisibilityBtn ? revealOn : revealOff} {...styledProps}><Ripple center preventDupClick/></RevealButton>
                }
            </InputContainer>
        </InputField>
    )
});

Input.defaultProps = {
    type: 'text',
    variant: 'standard',
    size: 20,
    color: 'rgba(0, 0, 0, 0.45)',
    errorColor: 'red',
    focusColor: '#26a69a',
    helperPlacement: 'bottom-right',
    bgColor: '#fff',
    autoComplete: 'off',
};

export default Input;