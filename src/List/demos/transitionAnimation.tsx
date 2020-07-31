import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import List, { ItemProps } from '../index';

interface Item extends ItemProps {
    bgColor?: string
}

let key = 0;

const ListItem = styled.div<{ bgColor?: string }>`
    width: 200px;
    height: 60px;
    background-color: ${({ bgColor }) => bgColor || 'black'};
    margin-top: 12px;
`;

const TransitionAnimationDemo = () => {
    const [list, setList] = useState<Item[]>([]);

    const addItem = useCallback(() => {
        setList(pre => {
            const random = Math.floor(Math.random() * list.length);
            const newList = pre.slice();
            newList.splice(random, 0, {
                key: ++key,
                bgColor: (key - 1) % 2 === 0 ? '#' + Math.random().toString(16).substr(2, 6).toUpperCase() : 'red',
                animationType: (key - 1) % 2 === 0 ? 'slideLeft' : undefined,
                animationDuration: (key - 1) % 2 === 0 ? { enter: 600, leave: 1000 } : undefined
            })
            return newList;
        });
    }, []);

    const removeItem = useCallback(() => {
        setList(pre => {
            const random = Math.floor(Math.random() * pre.length);
            return pre.filter((_, index) => index !== random);
        });
    }, []);

    return (
        <div>
            <button onClick={addItem}>add</button>
            <button onClick={removeItem}>remove</button>
            <List list={list} animationType='door' animationDuration={300}>
                {item => <ListItem bgColor={item.bgColor}>{item.animationType ? '组件自身动画' : '列表全局动画'}</ListItem>}
            </List>
        </div>
    )
}

export default TransitionAnimationDemo;