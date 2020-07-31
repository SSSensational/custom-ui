import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { composeRef } from '../ref';

let _ref: any;
function setRef<T>(ref: T){ _ref = ref;};

describe('utils/composeRef', () => {
    it('should set current ref', () => {
        const ref = createRef();
        const { getByTestId } = render(<div data-testid="test" ref={composeRef(ref, setRef)}/>)
        const button = getByTestId('test');
        expect(_ref).toBe(button);
        expect(ref.current).toBe(button);
    });

    it('should set current ref with arguments in a array', () => {
        const ref = createRef();
        const { getByTestId } = render(<div data-testid="test2" ref={composeRef([ref, setRef])}/>)
        const button = getByTestId('test2');
        expect(_ref).toBe(button);
        expect(ref.current).toBe(button);
    });
});
