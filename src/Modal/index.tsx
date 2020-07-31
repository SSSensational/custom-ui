import React, { HTMLAttributes, PropsWithChildren, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { useKey } from 'react-use';
import { OverWrite } from '../_types';
import { isDOMElement } from '../_utils';
import { useClickAnyOther } from '../_hooks';
import Mask from '../Mask';
import { transitionAnimation, TransitionAnimationType } from '../Animation';

let innerContainer: null | HTMLElement = null;
function createContainer(container?: HTMLElement) {
    if (!container || !isDOMElement(container)) {
        if (innerContainer) return innerContainer;
        container = document.createElement('div');
        container.setAttribute('id', 'modal-container');
        container.style.position = 'absolute';
        document.body.appendChild(container);
        innerContainer = container;
    }
    return container;
}

export type Props = OverWrite<HTMLAttributes<HTMLDivElement>, {
    open: boolean;
    container?: HTMLElement;
    showMask?: boolean;
    animationType: TransitionAnimationType;
    animationDuration?: number | { enter: number, leave: number };
    clickToClose?: boolean;
    escToClose?: boolean;
    onClose?: Function;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    maskClassName?: string;
    maskStyke?: CSSProperties;
}>;

const ModalPos = styled.div`
    position: fixed;
    width: fit-content;
    z-index: 201;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const ModalEle = styled(animated.div)<Partial<Props>>`
    display: inline-block;
    will-change: transform;
`;

const Modal = ({ open, showMask, children, container, animationType, animationDuration, wrapperClassName, wrapperStyle, maskClassName, maskStyke, style, onClose, clickToClose, escToClose, ...props }: PropsWithChildren<Props>) => {
    const render = useTransition(open, {
        from: transitionAnimation[animationType].from,
        enter: {
            ...transitionAnimation[animationType].enter,
            config: {
                ...transitionAnimation[animationType].enter?.config,
                duration: typeof animationDuration === 'object' ? animationDuration?.enter : animationDuration
            }
        },
        leave: {
            ...transitionAnimation[animationType].leave,
            config: {
                ...transitionAnimation[animationType].leave?.config,
                duration: typeof animationDuration === 'object' ? animationDuration?.leave : animationDuration
            }
        }
    }, );

    const ref = useClickAnyOther(open && clickToClose ? onClose : undefined, [open, clickToClose, onClose]);
    useKey('Escape', open && escToClose ? onClose as VoidFunction: undefined, undefined, [open, escToClose, onClose]);
    
    if (typeof window === 'undefined') return null;
    return createPortal(
        <>
            {<Mask open={open} className={maskClassName} style={maskStyke}/>}
            {render((animationStyle, openModal) =>
                openModal &&
                    <ModalPos ref={ref} className={wrapperClassName} style={wrapperStyle}>
                        <ModalEle style={{ ...style, ...animationStyle }} {...props}>
                            {children}
                        </ModalEle>
                    </ModalPos>
            )}
        </>,
        createContainer(container)
    );
}

Modal.defaultProps = {
    animationType: 'zoom',
    showMask: true,
    escToClose: true
};

export default Modal;