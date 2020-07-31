import React, { createContext, useCallback, useState, useContext } from 'react';
import { Props as CheckboxProps } from './index';

export interface Props {
    onChange?: (value: string[]) => void,
    disabled?: boolean,
    value?: string[],
    defaultValue?: string[],
    max?: number
}

const Context = createContext<Props & { usedValue: string[] } | null>(null);

const getMaxDisabled = (usedValue: string[], max: number = 0, name: string) => {
    if (max === 0) return false;
    if (usedValue.length >= max && !usedValue.includes(name)) return true;
    return false;
}

export const useGroup = (props: CheckboxProps) => {
    const ContextValue = useContext(Context);
    if (!ContextValue || !props.name) return props;
    const { defaultValue, onChange, value, disabled, max, usedValue } = ContextValue;

    return ({
        ...props,
        defaultChecked: defaultValue || (!defaultValue && !value) ? defaultValue instanceof Array && defaultValue.includes(props.name) : undefined,
        checked: !defaultValue && value ? value instanceof Array && value.includes(props.name) : undefined,
        disabled: disabled || getMaxDisabled(usedValue, max, props.name),
        onChange,
    });
}

const CheckboxGroup: React.FC<Props> = ({ children, defaultValue, disabled, value, max = 0, onChange}) => {
    const [innerValue, setInnerValue] = useState<string[]>(defaultValue || []);
    const usedValue = value || innerValue;
    const checkboxChange = useCallback((e) => {
        const nextValue = e.target.checked ? [...usedValue, e.target.name] : usedValue.filter(name => name !== e.target.name);
        if (!value) setInnerValue(nextValue);
        if (onChange) onChange(nextValue);
    }, [onChange, usedValue]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Context.Provider value={{ defaultValue, onChange: checkboxChange, value, usedValue, disabled, max }}>
            {children}
        </Context.Provider>
    );
}

export default CheckboxGroup;