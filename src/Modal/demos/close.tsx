import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../index';

const Content = styled.div`
    display: inline-block;
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, .5);
`;

const CloseDemo = () => {
    const [open, set] = useState(false);
    const openModal = () => {
        set(true);
    }
    const closeModal = () => {
        set(false);
    }
    return (
        <>
            <button onClick={openModal}>打开Modal</button>
            <Modal open={open} escToClose clickToClose onClose={closeModal} >
                <Content>
                    <p>按esc键或者点击其他地方关闭</p>
                </Content>
            </Modal>
        </>
    );
}

export default CloseDemo;