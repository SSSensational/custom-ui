import { useRef, useEffect, DependencyList } from 'react';
import { isDOMElement } from '../_utils';

export const useClickAnyOther = (handler?: Function | VoidFunction, deps?: DependencyList) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        if (!handler || !isDOMElement(ref.current)) return;
        
        const handlerFunc= (e: MouseEvent) => {
            const target = e?.target || e?.srcElement;
            if (!ref.current.contains(target)) handler?.();
        }

        document.addEventListener('click', handlerFunc);
        return () => {
            document.removeEventListener('click', handlerFunc);
        }
    }, deps ?? [])
    return ref;
}