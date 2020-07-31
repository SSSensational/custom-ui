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

const AnimatedHeightDemo = () => {
    const [list, setList] = useState<Item[]>([{
        key,
        bgColor: 'red'
    }]);

    const addItem = useCallback(() => {
        setList(pre => {
            const random = Math.floor(Math.random() * list.length);
            const newList = pre.slice();
            newList.splice(random, 0, {
                key: ++key,
                bgColor: '#' + Math.random().toString(16).substr(2, 6).toUpperCase(),
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
            <List list={list} animatedHeight>
                {item => <ListItem bgColor={item.bgColor} />}
            </List>
        </div>
    )
}

export default AnimatedHeightDemo;