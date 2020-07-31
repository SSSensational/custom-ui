import React, { useEffect, useState, useCallback, HTMLAttributes } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { toggleBodyScroll } from './util';
import { OverWrite } from '../_types';

export type Props = OverWrite<HTMLAttributes<HTMLDivElement>, {
    open: boolean;
    zIndex?: number;
}>;

const fadeIn  = keyframes`
    from {
        opacity: 0;
    }
`;

const fadeOut  = keyframes`
    to {
        opacity: 0
    }
`;

const MaskEle = styled.div<Props>`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0);
    opacity: .4;
    animation: ${({ open }) => css`${open ? fadeIn : fadeOut} both ${open ? 'ease-in' : 'ease-out'} ${open ? 300 : 333}ms`};
    z-index: ${({ zIndex}) => zIndex || 200};
`;

const Mask = ({ open, className, ...props }: Props) => {
    const [showMask, setShowMask] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setShowMask(true);
            toggleBodyScroll(true);
        }
    }, [open]);

    const closeMask = useCallback(() => {
        if (!open) {
            setShowMask(false);
            toggleBodyScroll(false);
        }
    }, [open]);

    if (!showMask) return null;
    return (<MaskEle className={`${className ?? ''} custom-ui-modal`} open={open} {...props} onAnimationEnd={closeMask}/>);
}

export default Mask;