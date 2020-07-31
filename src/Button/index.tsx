import React, { forwardRef, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { isLegalCSSColor } from '../_utils';
import { OverWrite } from '../_types';
import ButtonBase, { Color as ButtonBaseColor, Props as ButtonProps } from '../ButtonBase';
import Ripple from '../Ripple';
import Spin, { Props as SpinProps } from '../Spin';

interface Color extends ButtonBaseColor {
    rippleColor?: string;
    loadingColor?: string;
}

export type Props = OverWrite<ButtonProps, {
    color?: Color | string;
    loading?: boolean | SpinProps['type'];
    disabled?: boolean | boolean[];
    rippleCenter?: boolean;
}>


const Loading = styled(Spin)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

const Content = styled.div`
    width: fit-content;
    height: fit-content;
`;

const ButtonEnhance = styled(ButtonBase)<Props & { inLoading?: boolean | SpinProps['type'] }>`
    &[disabled] {
        opacity: ${({ inLoading }) => inLoading ? 1 : .6};
        cursor: not-allowed;
    }
    ${Content}:nth-child(1) {
        visibility: ${({ inLoading }) => inLoading ? 'hidden' : 'visible'};;
    }
`;

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(({ children, loading, disabled, color, rippleCenter, ...props }, ref) => {
    return (
        <ButtonEnhance
            {...props}
            color={color}
            inLoading={loading}
            disabled={loading ? true : disabled instanceof Array ? disabled.includes(true) : disabled}
            ref={ref}
        >
            <Content>{children}</Content>
            {loading &&
                <Loading
                    size="1.3em"
                    type={loading === true ? "ball-dash" : loading}
                    color={typeof color === 'object' && isLegalCSSColor(color.loadingColor) ? color.loadingColor : 'currentColor'}
                />
            }
            <Ripple
                color={typeof color === 'object' && isLegalCSSColor(color.rippleColor) ? color.rippleColor : 'currentColor'}
                disabled={loading ? true : disabled instanceof Array ? disabled.includes(true) : disabled}
                center={rippleCenter}
            />
        </ButtonEnhance>
    )
});

export default Button;