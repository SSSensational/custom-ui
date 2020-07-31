import React, { useRef, useCallback, forwardRef, PropsWithChildren, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import Color from 'color';
import { uniqueId, composeRef } from '../_utils';
import { OverWriteOmit } from '../_types';
import { getSize, getColor, getFlexDirection, getMargin } from './util';
import RadioGroup, { useGroup, Props as RadioGroupProps } from './group';
export { default as RadioGroup } from './group';
import { useFormProps, Rule } from '../Form/context';
import Ripple from '../Ripple';

export type Props = OverWriteOmit<InputHTMLAttributes<HTMLInputElement>, {
    id?: string;
    size?: number | string;
    color?: string;
    labelPlacement?: 'bottom' | 'right' | 'left' | 'top';
    labelDistance?: number | string;
    interactive?: boolean | 'background';
    rules?: Rule[];
}, 'width' | 'fontSize' | 'placeholder' | 'type'>;

const Interactive = styled.div`
    all: unset;
    position: absolute;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Check = styled.div<Props>`
    all: unset;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    width: ${({ interactive }) => interactive === true ? '2em' : '1em'};
    height: ${({ interactive }) => interactive === true ? '2em' : '1em'};
    border-radius: 50%;
    margin: ${(props) => getMargin(props)};
    color: ${(props) => getColor(props)};
    opacity: ${({ disabled }) => disabled ? '.75' : '1'};
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    &::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        border-radius: 50%;
        width: 1em;
        height: 1em;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: background-color 250ms cubic-bezier(0.0, 0, 0.2, 1), transform 250ms cubic-bezier(0.0, 0, 0.2, 1);
    }
    &::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        border-radius: 50%;
        width: 1em;
        height: 1em;
        border: 1px solid;
        border-color: ${({ disabled, ...props }) => disabled ? '#8F9090' : getColor(props)};
        opacity: ${({ disabled }) => disabled ? '.75' : '1'};
        transition: border-color 250ms cubic-bezier(0.0, 0, 0.2, 1);
    }
`;

const Input = styled.input`
    all: unset;
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
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
    bottom: 0;
    transform: translateY(calc(100% - .3em));
    color: red;
`;

const Container = styled.label<Props>`
    all: unset;
    position: relative;
    display: inline-flex;
    flex-direction: ${(props) => getFlexDirection(props)};
    align-items: center;
    font-size: ${(props) => getSize(props)};
    opacity: ${({ disabled }) => disabled ? .6 : 1};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    ${Input}:checked ~ ${Check} {
        &::before {
            transform: translate(-50%, -50%) scale(.6);
            background-color: ${({ disabled, ...props }) => disabled ? '#8F9090' : getColor(props)};
        }
    }
    &:hover, &:focus-within {
        ${Check} {
            background-color: ${({ disabled, interactive, ...props }) => interactive === true && !disabled ? Color(getColor(props)).opaquer(-.9).toString() : ''};
        }
        ${Interactive} {
            background-color: ${({ disabled, interactive, ...props }) => interactive === 'background' && !disabled ? Color(getColor(props)).opaquer(-.9).toString() : ''};
        }
    }
`;

const Radio: React.ForwardRefExoticComponent<PropsWithChildren<Props>> & { Group?: React.FC<RadioGroupProps> } = forwardRef((props, ref) => {
    const contextedProps = useGroup(props);
    const formedProps = useFormProps(contextedProps);

    const { id, children, className, style, size, color, disabled, interactive, labelPlacement, labelDistance, helperText, error, ...nativeProps } = formedProps;
    const styledProps = { size, color, disabled, interactive, labelPlacement, labelDistance };

    const radioId = useRef<string>(id || uniqueId('radio'));
    const radioRef = useRef<HTMLInputElement>(null);
    const onClick = useCallback(() => radioRef.current?.blur?.(), []);


    return (
        <Container className={className} style={style} htmlFor={radioId.current} {...styledProps} onClick={onClick}>
            <Input ref={composeRef([radioRef, ref])} id={radioId.current} disabled={disabled} {...nativeProps as any} type="radio"/>
            <Check {...styledProps}>
                {interactive === true && <Ripple center disabled={disabled}/>}
                {interactive === 'background' && <Interactive><Ripple center disabled={disabled}/></Interactive>}
            </Check>
            {children}
            {error && helperText && <Error>{helperText}</Error>}
        </Container>
    );
});

Radio.defaultProps = {
    size: 20,
    color: '#3E4DA7',
    labelPlacement: 'right',
    labelDistance: '.5em',
    interactive: 'background',
};

Radio.Group = RadioGroup;

export default Radio as React.ForwardRefExoticComponent<PropsWithChildren<Props>> & { Group: React.FC<RadioGroupProps> };
