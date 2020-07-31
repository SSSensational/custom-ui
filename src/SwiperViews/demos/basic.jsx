import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import SwiperViews from '../index';
const views = [{ bgColor: 'red ' }, { bgColor: 'blue' }, { bgColor: 'green' }, { bgColor: 'yellow' }];
const View = styled.div `
`;
const BasicDemo = () => {
    const swiper = useRef(null);
    const [direction, setDirection] = useState('row');
    const [size, setSize] = useState(1);
    const [scaleInDrag, setScaleInDrag] = useState(true);
    const [enableDrag, setEnableDrag] = useState(true);
    const [autoplay, setAutoplay] = useState(false);
    return (<>
            <button onClick={() => setDirection(pre => pre === 'row' ? 'column' : 'row')}>改变 direction ({direction})</button>
            <button onClick={() => setSize(pre => pre === 1 ? .75 : pre === .75 ? .5 : 1)}>改变 size ({size})</button>
            <button onClick={() => setScaleInDrag(pre => pre === true ? 'noShadow' : pre === 'noShadow' ? false : true)}>改变 拖动时缩放视图 ({String(scaleInDrag)})</button>
            <button onClick={() => setEnableDrag(pre => !pre)}>改变 允许拖动 ({String(enableDrag)})</button>
            <button onClick={() => setAutoplay(pre => pre === false ? 3000 : false)}>改变 自动轮播 ({String(autoplay)})</button>
            <button onClick={() => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(0); }}> goto 页面0 </button>
            <button onClick={() => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(2); }}> goTo 页面2 </button>
            <button onClick={() => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(-1); }}> goTo 页面-1 </button>
            <button onClick={() => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(12); }}> goTo 页面12 </button>
            <SwiperViews ref={swiper} style={{ width: 1000, height: 600, maxWidth: '100%', maxHeight: '80%' }} direction={direction} size={size} scaleInDrag={scaleInDrag} enableDrag={enableDrag} autoplay={autoplay}>
                {views.map((view, index) => <View key={index} style={{ backgroundColor: view.bgColor }}>页面-{index}</View>)}
            </SwiperViews>
            <SwiperViews style={{ width: 1000, height: 600, maxWidth: '100%', maxHeight: '80%', marginTop: 100 }} size={.7} loop>
                {views.map((view, index) => <View key={index} style={{ backgroundColor: view.bgColor }}>首尾相连循环-{index}</View>)}
            </SwiperViews>
            <SwiperViews style={{ width: 1000, height: 600, maxWidth: '100%', maxHeight: '80%', marginTop: 100 }} circular>
                {views.map((view, index) => <View key={index} style={{ backgroundColor: view.bgColor }}>首尾复位循环-{index}</View>)}
            </SwiperViews>
        </>);
};
export default BasicDemo;
