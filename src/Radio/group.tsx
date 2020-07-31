import React, { createContext, useCallback, useState, useContext } from 'react';
import { Props as RadioProps } from './index';

export interface Props {
    onChange?: (value: string[]) => void,
    disabled?: boolean,
    value?: string[],
    defaultValue?: string[],
    max?: number
}

const Context = createContext<Props & { usedValue: string[] } | null>(null);

export const useGroup = (props: RadioProps) => {
    const ContextValue = useContext(Context);
    if (!ContextValue || !props.name) return props;
    const { onChange, disabled, usedValue } = ContextValue;

    return ({
        ...props,
        defaultChecked: undefined,
        checked: usedValue ? usedValue instanceof Array && usedValue.includes(props.name) : undefined,
        disabled: disabled,
        onChange,
    });
}

const RadioGroup: React.FC<Props> = ({ children, defaultValue, disabled, value, max = 1,onChange }) => {
    const [innerValue, setInnerValue] = useState<string[]>(defaultValue || []);
    const usedValue = value || innerValue;
    const checkboxChange = useCallback((e) => {
        let nextValue;
        if (usedValue.length < max) nextValue = usedValue.concat(e.target.name);
        else nextValue = usedValue.slice(1).concat(e.target.name);
        if (!value) setInnerValue(nextValue);
        if (onChange) onChange(nextValue);
    }, [onChange, usedValue, max]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Context.Provider value={{ onChange: checkboxChange, usedValue, disabled }}>
            {children}
        </Context.Provider>
    );
}

export default RadioGroup;