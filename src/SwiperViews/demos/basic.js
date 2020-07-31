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
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: () => setDirection(pre => pre === 'row' ? 'column' : 'row') },
            "\u6539\u53D8 direction (",
            direction,
            ")"),
        React.createElement("button", { onClick: () => setSize(pre => pre === 1 ? .75 : pre === .75 ? .5 : 1) },
            "\u6539\u53D8 size (",
            size,
            ")"),
        React.createElement("button", { onClick: () => setScaleInDrag(pre => pre === true ? 'noShadow' : pre === 'noShadow' ? false : true) },
            "\u6539\u53D8 \u62D6\u52A8\u65F6\u7F29\u653E\u89C6\u56FE (",
            String(scaleInDrag),
            ")"),
        React.createElement("button", { onClick: () => setEnableDrag(pre => !pre) },
            "\u6539\u53D8 \u5141\u8BB8\u62D6\u52A8 (",
            String(enableDrag),
            ")"),
        React.createElement("button", { onClick: () => setAutoplay(pre => pre === false ? 3000 : false) },
            "\u6539\u53D8 \u81EA\u52A8\u8F6E\u64AD (",
            String(autoplay),
            ")"),
        React.createElement("button", { onClick: () => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(0); } }, " goto \u9875\u97620 "),
        React.createElement("button", { onClick: () => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(2); } }, " goTo \u9875\u97622 "),
        React.createElement("button", { onClick: () => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(-1); } }, " goTo \u9875\u9762-1 "),
        React.createElement("button", { onClick: () => { var _a; return (_a = swiper.current) === null || _a === void 0 ? void 0 : _a.goto(12); } }, " goTo \u9875\u976212 "),
        React.createElement(SwiperViews, { ref: swiper, style: { width: 1000, height: 600, maxWidth: '100%', maxHeight: '80%' }, direction: direction, size: size, scaleInDrag: scaleInDrag, enableDrag: enableDrag, autoplay: autoplay }, views.map((view, index) => React.createElement(View, { key: index, style: { backgroundColor: view.bgColor } },
            "\u9875\u9762-",
            index))),
        React.createElement(SwiperViews, { style: { width: 1000, height: 600, maxWidth: '100%', maxHeight: '80%', marginTop: 100 }, size: .7, loop: true }, views.map((view, index) => React.createElement(View, { key: index, style: { backgroundColor: view.bgColor } },
            "\u9996\u5C3E\u76F8\u8FDE\u5FAA\u73AF-",
            index))),
        React.createElement(SwiperViews, { style: { width: 1000, height: 600, maxWidth: '100%', maxHeight: '80%', marginTop: 100 }, circular: true }, views.map((view, index) => React.createElement(View, { key: index, style: { backgroundColor: view.bgColor } },
            "\u9996\u5C3E\u590D\u4F4D\u5FAA\u73AF-",
            index)))));
};
export default BasicDemo;
