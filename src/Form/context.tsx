import React, { useContext, RefObject } from 'react';
import { ValidationRules, UseFormMethods } from 'react-hook-form';
import { OverWrite, EitherField } from '../_types';

interface FormContextProps {
    register: UseFormMethods['register'];
    errors: UseFormMethods['errors'];
}

export const FormContext = React.createContext<FormContextProps | null>(null);

export type Rule = { helperText: string } & EitherField<ValidationRules>;

interface extraReturnProps {
    formRef: RefObject<any>;
    name: string;
    helperText: string;
    error: boolean;
    isRequired: boolean;
}

export function useFormProps<T>(props: T & { rules?: Rule[], name?: string }): T & OverWrite<T, extraReturnProps> {
    const { rules, name, ...otherProps } = props;
    const contextValue = useContext(FormContext);
    if (!contextValue || !name || !rules) return props as any;
    const { register, errors } = contextValue;
    const registerObj: Record<string, any> = {};
    rules && rules.forEach(rule => Object.entries(rule).forEach(([key, val]) => {
        if (key !== 'helperText') registerObj[key] = val;
    }));

    return {
        ...otherProps,
        name,
        formRef: register(registerObj),
        helperText: rules && rules.find((rule: any) => rule?.[errors?.[name]?.type])?.helperText,
        error: errors?.[name as string],
        isRequired: registerObj.required,
    } as any;
}