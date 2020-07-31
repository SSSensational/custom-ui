import React, { FormHTMLAttributes } from 'react';
import { useForm, useFormContext, UseFormMethods, SubmitHandler } from 'react-hook-form';
import { OverWrite } from '../_types';
import { FormContext } from './context';

export type Props = OverWrite<FormHTMLAttributes<HTMLFormElement>, {
    onSubmit: SubmitHandler<Record<string, any>>;
}>;

const Form = (props: Props) => {
    const contextValue = useFormContext();
    if (!contextValue) return <FormContent {...props} />
    return <FormContentWithContext contextValue={contextValue} {...props} />
};

const emptySumbmit = () => {};

const FormContent: React.FC<Props> = ({ onSubmit, children, ...props }) => {
    const { register, handleSubmit, errors } = useForm();
    
    return (
        <FormContext.Provider value={{ register, errors }}>
            <form onSubmit={handleSubmit(typeof onSubmit === 'function' ? onSubmit : emptySumbmit)} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

const FormContentWithContext: React.FC<Props & { contextValue: UseFormMethods } > = ({ contextValue, onSubmit, children, ...props }) => {
    const { register, handleSubmit, errors } = contextValue;
    
    return (
        <FormContext.Provider value={{ register, errors }}>
            <form onSubmit={handleSubmit(typeof onSubmit === 'function' ? onSubmit : emptySumbmit)} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

export * from 'react-hook-form';
export default Form;
