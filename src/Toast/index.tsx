import React, { createRef, RefObject } from 'react';
import { render, createPortal } from 'react-dom';
import ToastComponent, { ToastMethods } from './Toast';
import { isDOMElement } from '../_utils';

export class ToastClass implements ToastMethods {
    toastRef: RefObject<ToastMethods>;
    constructor() {
        this.toastRef = createRef<ToastMethods>();
    }

    show: ToastMethods['show'] = (props) => {
        this.init(undefined, 'show', props);
    }

    hide: ToastMethods['hide'] = (props) => {
        this.init(undefined, 'hide', props);
    }

    hideAll: ToastMethods['hideAll'] = () => {
        this.init(undefined, 'hideAll');
    }

    setMaskStyle: ToastMethods['setMaskStyle'] = (props) => {
        this.init(undefined, 'setMaskStyle', props);
    }

    setMaskClassName: ToastMethods['setMaskClassName'] = (props) => {
        this.init(undefined, 'setMaskClassName', props);
    }

    setMaskClickHandler: ToastMethods['setMaskClickHandler'] = (props) => {
        this.init(undefined, 'setMaskClickHandler', props);
    }

    setListStyle: ToastMethods['setListStyle'] = (props) => {
        this.init(undefined, 'setListStyle', props);
    }
    
    setListClassName: ToastMethods['setListClassName'] = (props) => {
        this.init(undefined, 'setListClassName', props);
    }

    setItemWrapperStyle: ToastMethods['setItemWrapperStyle'] = (props) => {
        this.init(undefined, 'setItemWrapperStyle', props);
    }

    setItemWrapperClassName: ToastMethods['setItemWrapperClassName'] = (props) => {
        this.init(undefined, 'setItemWrapperClassName', props);
    }

    init = (container?: HTMLElement, method?: keyof ToastMethods, props?: any) => {
        if (!this.toastRef.current) {
            if (!container || !isDOMElement(container)) {
                container = document.createElement('div');
                container.setAttribute('id', 'toast-container');
                container.style.position = 'absolute';
                document.body.appendChild(container);
            }
            render(<ToastComponent ref={this.toastRef}/>, container);
        }
        const toastInstance = this.toastRef.current as unknown as ToastMethods;
        this.show = toastInstance.show;
        this.hide = toastInstance.hide;
        this.hideAll = toastInstance?.hideAll;
        this.setMaskStyle = toastInstance?.setMaskStyle;
        this.setMaskClassName = toastInstance?.setMaskClassName;
        this.setMaskClickHandler = toastInstance?.setMaskClickHandler;
        this.setListStyle = toastInstance?.setListStyle;
        this.setListClassName = toastInstance?.setListClassName;
        this.setItemWrapperStyle = toastInstance?.setItemWrapperStyle;
        this.setItemWrapperClassName = toastInstance?.setItemWrapperClassName;
        if (method) this[method](props)
    }

    Provider = ({ container }: { container?: HTMLElement }) => {
        if (!container || !isDOMElement(container)) {
            container = document.createElement('div');
            container.setAttribute('id', 'toast-container');
            container.style.position = 'absolute';
            document.body.appendChild(container);
        }
        return createPortal(React.createElement(ToastComponent, { ref: this.toastRef }), container);
    }
}

export default new ToastClass();