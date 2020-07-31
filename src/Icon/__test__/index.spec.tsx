import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../index';

let svg = <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1312" width="128" height="128"><path d="M512 232.3C316.8 232.3 147.6 346 64.4 512 147.6 678 316.8 791.7 512 791.7S876.4 678 959.6 512C876.4 346 707.2 232.3 512 232.3z m220.7 148.3c52.6 33.5 97.1 78.5 130.6 131.4-33.5 52.9-78 97.8-130.6 131.4-66.1 42.2-142.4 64.4-220.7 64.4s-154.6-22.3-220.7-64.4c-52.6-33.5-97.1-78.5-130.6-131.4 33.5-52.9 78-97.8 130.6-131.4 3.4-2.2 6.9-4.3 10.4-6.4-8.7 23.9-13.5 49.7-13.5 76.6 0 123.6 100.2 223.8 223.8 223.8s223.8-100.2 223.8-223.8c0-26.9-4.8-52.7-13.5-76.6 3.5 2.1 6.9 4.2 10.4 6.4zM512 428.1c0 46.4-37.6 83.9-83.9 83.9s-83.9-37.6-83.9-83.9 37.6-83.9 83.9-83.9 83.9 37.5 83.9 83.9z" p-id="1313"></path></svg>
describe('<Icon/>', () => {
    it('renders the correct string children', () => {
        const { getByText } = render(<Icon src={<div></div>}>string</Icon>)
        const button = getByText('string');
        expect(button).toMatchSnapshot();
    });
});
