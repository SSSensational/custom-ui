import React from 'react';
import Form, { useForm, FormProvider } from '../index';
import Input from "../../Input/demos/StyledInput";
import Checkbox from "../../Checkbox";
import Button from "../../Button";

const Demo = () => {
    const methods = useForm(); // initialise the hook
    const { register, errors, watch } = methods;

    return (
        <FormProvider {...methods}>
            <Form onSubmit={data => console.log(data)}>
                <input ref={register({ required: true })} name="user" placeholder="Input user" />
                {errors.user && <span>User is required.</span>}
                <Input
                    name="email"
                    label="input email"
                    ref={register({
                        required: "email is required.",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'error email format'
                        }
                    })}
                    error={errors?.email}
                    helperText={errors?.email?.message}
                />
                <Input name="sex" variant="outlined" label="input sex"  rules={[{ required: true, helperText: 'Sex is required.' }, { maxLength: 3, helperText: 'MaxLength is 3.' }]}/>
                <Input
                    name="age"
                    label="input age" 
                    rules={[{ required: true, helperText: 'Age is required.' }, { pattern: /\d+/, helperText: 'Age must be number' }]}
                />
                <Input
                    name="password"
                    label="Input Password" 
                    rules={[{ required: true, helperText: 'Password is required.' }]}
                />
                <Input
                    name="password_confirm"
                    label="Input password again" 
                    rules={[{ validate: (value: string) => value === watch("password"), helperText: 'Password different ' }]}
                />
                <Checkbox name="agree" rules={[{ required: true, helperText: 'You must agree toTerms of UseandPrivacy Policy' }]}>同意协议</Checkbox>
                <Checkbox name="remember-account">记住账号</Checkbox>
                <Button type="submit" style={{ display: 'block', marginTop: 24 }}>
                    提交
                </Button>
            </Form>
        </FormProvider>
    );
}

export default Demo;