import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Popper, { Props as PopperProps } from '../Popper';
import { OverWriteOmit } from '../_types';

export type Props = OverWriteOmit<PopperProps, {
    title: string;
}, 'Content'>;

const TooltipContainer = styled(Popper)`
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
`;

const Tooltip = ({ title, children, ...props }: PropsWithChildren<Props>) => {
    return (
        <TooltipContainer
            Content={title}
            {...props}
        >
            {children}
        </TooltipContainer>
    );
}

Tooltip.defaultProps = {
    placement: 'top',
    animationType: 'zoom',
    arrow: true,
    trigger: 'mouseenter focus'
};

export default Tooltip;