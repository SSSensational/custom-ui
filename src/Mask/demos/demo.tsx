import React, { useState } from 'react';
import Mask from '../index';

const Demo = () => {
    const [open, set] = useState(false);

    const handleClick = () => {
        set(true);
        setTimeout(() => set(false), 3000);
    }

    return (
        <>
            <button onClick={handleClick}>点击打开蒙版，三秒后关闭</button>
            <Mask open={open}/>
        </>
    );
}

export default Demo;