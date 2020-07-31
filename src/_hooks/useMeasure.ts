import { useRef, useState, useEffect, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { debounce } from 'lodash-es';

export function useMeasure(wait: number = 333): [RefObject<any>, { width: number, height: number, left: number, top: number }] {
    const ref = useRef<any>(null)
    const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
    useEffect(() => {
        const observerFunc = debounce(([entry]) => set(entry.contentRect), wait);
        const ro = new ResizeObserver(observerFunc);
        ro.observe(ref.current as Element);
        return () => ro.disconnect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return [ref, bounds];
}
