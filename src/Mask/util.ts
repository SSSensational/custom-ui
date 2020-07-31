const document = typeof window !== 'undefined' ? window.document : null;
const bodyEl = document?.body as HTMLElement;
let top = 0;
(function () {
    if (bodyEl) {
        bodyEl.style.width = '100vw';
        bodyEl.style.overflow = 'hidden';
        bodyEl.style.position = 'absolute';
        const htmlEl = document?.querySelector('html');
        if (htmlEl) {
            htmlEl.style.overflowY = 'auto';
            htmlEl.style.overflowX = 'hidden';    
        }
    }
}());

let fixNum = 0;

export function toggleBodyScroll (toFix: boolean) {
    if (toFix) {
        top = window.scrollY;
        bodyEl.style.position = 'fixed';
        bodyEl.style.top = -top + 'px';
        fixNum++;
    } else {
        fixNum--;
        if (fixNum !== 0) return;
        bodyEl.style.position = '';
        bodyEl.style.top = '';
        window.scrollTo(0, top);
    }
}