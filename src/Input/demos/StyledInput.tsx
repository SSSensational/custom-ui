import styled from 'styled-components';
import Input from '../index';

const StyledInput = styled(Input)`
    margin-top: 20px;
    & + & {
        margin-top: 40px;
    }
`;

export default StyledInput;