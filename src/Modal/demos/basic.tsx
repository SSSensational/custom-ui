import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../index';
const Modal1Content = styled.div`
    display: inline-block;
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, .5);
`
const Modal2 = styled(Modal)`
    width: 200px;
    height: 100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, .5);
`
const BasicDemo = () => {
    const [open1, set1] = useState(false);
    const [open2, set2] = useState(false);
    return (
        <>
            <button onClick={() => set1(true)}>打开Modal1</button>
            <Modal open={open1}>
                <Modal1Content>
                    <p>这是模态框1</p>
                    <button onClick={() => set1(false)}>关闭Modal1</button>
                </Modal1Content>
            </Modal>
            <button onClick={() => set2(true)}>打开Modal2</button>
            <Modal2 open={open2} style={{ color: 'red '}}>
                <p>这是模态框2</p>
                <button onClick={() => set2(false)}>关闭Modal2</button>
            </Modal2>
        </>
    );
}

export default BasicDemo;