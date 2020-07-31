import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { spy } from 'sinon';
import ButtonBase from '../index';

describe('<ButtonBase/>', () => {
    it('renders the correct string children', () => {
        const { getByText } = render(<ButtonBase>string</ButtonBase>)
        const button = getByText('string');
        expect(button).toMatchSnapshot();
    });

    it('renders the correct element children', () => {
        const { getByText } = render(<ButtonBase><span>string</span></ButtonBase>)
        const button = getByText('string');
        expect(button).toMatchSnapshot();
    });
      
    it('attaches the correct class name to the button\'s class name', () => {
        const { getByTestId } = render(<ButtonBase className="class" data-testid="button"/>)
        const button = getByTestId('button');
        expect(button.classList.contains('class')).toBe(true);
        expect(button).toMatchSnapshot();
    });
      
    it('has a disabled button if disabled prop is present', () => {
        const { getByTestId } = render(<ButtonBase data-testid="button" disabled />)
        const button = getByTestId('button');
        expect((button as any).disabled).toEqual(true)
        expect(button).toMatchSnapshot();
    });

    it('should change the button\'s node type to a', () => {
        const { getByTestId } = render(<ButtonBase data-testid="button" as="a" />);
        const button = getByTestId('button');
        expect(button).toHaveProperty('nodeName', 'A');
        expect(button).toMatchSnapshot();
    });

    it('should fire event callbacks', () => {
        const onClick = spy();
        const onBlur = spy();
        const onFocus = spy();
        const onKeyUp = spy();
        const onKeyDown = spy();
        const onMouseDown = spy();
        const onMouseLeave = spy();
        const onMouseUp = spy();
        const onDragEnd = spy();
        const onTouchStart = spy();
        const onTouchEnd = spy();
  
        const { getByTestId } = render(
            <ButtonBase
                data-testid="button"
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onDragEnd={onDragEnd}
                onTouchEnd={onTouchEnd}
                onTouchStart={onTouchStart}
            />
        );
        const button = getByTestId('button');
        if (typeof Touch !== 'undefined') {
            const touch = new Touch({ identifier: 0, target: button, clientX: 0, clientY: 0 });
            fireEvent.touchStart(button, { touches: [touch] });
            expect(onTouchStart.callCount).toEqual(1);
            fireEvent.touchEnd(button, { touches: [touch] });
            expect(onTouchEnd.callCount).toEqual(1);
        }

        fireEvent.dragEnd(button);
        expect(onDragEnd.callCount).toEqual(1);
  
        fireEvent.mouseDown(button);
        expect(onMouseDown.callCount).toEqual(1);
  
        fireEvent.mouseUp(button);
        expect(onMouseUp.callCount).toEqual(1);
  
        fireEvent.click(button);
        expect(onClick.callCount).toEqual(1);
  
        button.focus();
        expect(onFocus.callCount).toEqual(1);
  
        fireEvent.keyDown(button);
        expect(onKeyDown.callCount).toEqual(1);
  
        fireEvent.keyUp(button);
        expect(onKeyUp.callCount).toEqual(1);
  
        button.blur();
        expect(onBlur.callCount).toEqual(1);
  
        fireEvent.mouseLeave(button);
        expect(onMouseLeave.callCount).toEqual(1);
    });

    it('should not fire event callbacks when button is disabled', () => {
        const onClick = spy();
  
        const { getByTestId } = render(<ButtonBase data-testid="button" disabled onClick={onClick}/>);
        const button = getByTestId('button');

        fireEvent.click(button);
        expect(onClick.callCount).toEqual(0);
    });
});
