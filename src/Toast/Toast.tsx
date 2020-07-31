import React, { isValidElement, forwardRef, useEffect, useState, useCallback, useImperativeHandle, useRef, CSSProperties } from 'react';
import styled from 'styled-components';
import { uniqueId, runAsync } from '../_utils';
import { PartialOptional } from '../_types';
import List, { ItemProps } from '../List';
import Mask from '../Mask';

export interface ToastProps extends ItemProps {
    Content: React.ReactNode;
    duration?: number;
    preventDuplicate?: boolean,
    maximum?: number;
    unique?: boolean;
    queue?: boolean;
    showMask?: boolean;
    onClose?: Function;
}

export interface ToastMethods {
    show(props: PartialOptional<ToastProps, 'key'>): void;
    hide(key: string): void;
    hideAll(): void;
    setMaskStyle(style?: CSSProperties): void;
    setMaskClassName(className?: string): void;
    setListStyle(style?: CSSProperties): void;
    setListClassName(className?: string): void;
    setItemWrapperStyle(style?: CSSProperties): void;
    setItemWrapperClassName(className?: string): void;
    setMaskClickHandler(handler?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void): void;
}

const CustomItem = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    background-color: transparent;
    backface-visibility: visible;
    overflow: hidden;
`;

const Item = styled.div`
    width: fit-content;
    padding: 5px 8px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: 3px;
    backface-visibility: visible;
`;


const ToastItem = forwardRef<HTMLDivElement, ToastProps & { onClose: Function }>(({ onClose, Content, duration }, ref) => {
    useEffect(() => {
        let timer: number;
        if (duration !== 0) timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isValidElement(Content) || typeof Content === 'function')
        return (
            <CustomItem ref={ref}>
                {typeof Content === 'function' ? <Content /> : Content}
            </CustomItem>
        );
        return (<Item ref={ref}>{Content}</Item>);
});

const Container = styled.div`
    margin: 0;
    padding: 0;
`;

const ToastList = styled(List)`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    z-index: 201;
    pointer-events: none;
` as typeof List;

const ToastContainer = forwardRef<ToastMethods>((_, ref) => {
    const [toastList, setToastList] = useState<ToastProps[]>([]);
    const listQueue = useRef<ToastProps[]>([]);
    const [openMask, setOpenMask] = useState<boolean>(false);
    const [maskStyle, setMaskStyle] = useState<CSSProperties | undefined>(undefined);
    const [maskClassName, setMaskClassName] = useState<string | undefined>(undefined);
    const [maskClickHandler, setMaskClickHandler] = useState<((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined>(undefined);
    const [listStyle, setListStyle] = useState<CSSProperties | undefined>(undefined);
    const [listClassName, setListClassName] = useState<string | undefined>(undefined);
    const [itemWrapperStyle, setItemWrapperStyle] = useState<CSSProperties | undefined>(undefined);
    const [itemWrapperClassName, setItemWrapperClassName] = useState<string | undefined>(undefined);

    const pushToast = useCallback(({ Content, duration = 3000, showMask = false, key, preventDuplicate, maximum, unique, queue, ...props }: PartialOptional<ToastProps, 'key'>) => {
        const usedKey = key ?? uniqueId('toast');
        setToastList(curList => {
            if (key && curList.find((item: ToastProps) => item.key === key)) return curList;
            if (queue && curList.length) {
                listQueue.current.push({ Content, duration, showMask, key: usedKey, preventDuplicate, maximum, unique, ...props });
                return curList;
            }
            if (preventDuplicate && curList.find((item: ToastProps) => item.Content === Content)) return curList;
            if (maximum && curList.length > 0 && curList.length >= maximum) curList = curList.slice(0, maximum - 1);
            return ([
                    { key: usedKey, Content, duration, showMask, ...props }, 
                    ...(unique && curList.length >= 1 ? [] : curList)
            ]);
        });
        runAsync(() => { if (showMask) setOpenMask(true); });
        return usedKey;
    }, []);

    const popToast = useCallback((key: ToastProps['key']) => {
        let isListEmpty = false;
        setToastList(curList => {
            const newList = curList.filter((item: ToastProps) => item.key !== key);
            if (!newList.find(item => item.showMask)) setOpenMask(false);
            if (!newList.length && listQueue.current.length) isListEmpty = true;
            return newList;
        });
        runAsync(() => { if (isListEmpty) pushToast(listQueue.current.shift() as ToastProps); });
    }, []);

    const popAllToast = useCallback(() => {
        listQueue.current = [];
        setToastList([]);
        setOpenMask(false);
    }, []);

    const setMaskClick = useCallback((func: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void): void => {
        setMaskClickHandler(() => func);
    }, []);

    useImperativeHandle(ref, () => ({ show: pushToast, hide: popToast, hideAll: popAllToast, setMaskStyle, setMaskClassName, setListStyle, setListClassName, setItemWrapperStyle, setItemWrapperClassName, setMaskClickHandler: setMaskClick }));

    return (
        <Container>
            <Mask open={openMask} className={maskClassName} style={maskStyle} onClick={maskClickHandler}/>
            <ToastList
                list={toastList}
                animatedHeight
                className={listClassName}
                style={listStyle}
                ItemWrapperClassName={itemWrapperClassName}
                ItemWrapperStyle={{ marginBottom: 12, ...itemWrapperStyle }}
            >
                {toast => <ToastItem onClose={() => { popToast(toast.key); toast?.onClose?.(); }} {...toast} />}
            </ToastList>
        </Container>
    );
});

export default ToastContainer;