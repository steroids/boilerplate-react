import {login} from '@steroidsjs/core/actions/auth';
import {useBem, useDispatch} from '@steroidsjs/core/hooks';
import {
    Form,
    Button,
    InputField,
} from '@steroidsjs/core/ui/form';
import {MASK_PRESETS} from '@steroidsjs/core/ui/form/InputField/InputField';
import React from 'react';

import {ROUTE_USERS} from '../index';

import './LoginPage.scss';

const FORM_ID = 'LoginForm';

export default function LoginPage() {
    const bem = useBem('LoginPage');
    const dispatch = useDispatch();

    return (
        <div className={bem.block()}>
            <Form
                formId={FORM_ID}
                action='/api/v1/auth/login'
                actionMethod='POST'
                onComplete={(values, response) => {
                    if (response.accessToken) {
                        dispatch(login(response.accessToken, ROUTE_USERS));
                    }
                }}
                className={bem.element('form')}
            >
                <h2 className={bem.element('title')}>{__('Вход')}</h2>
                <InputField
                    attribute='login'
                    label={__('Логин')}
                    size='md'
                    maskOptions={MASK_PRESETS.phone}
                    placeholder='+7'
                />
                <InputField
                    attribute='password'
                    label={__('Пароль')}
                    type='password'
                    size='md'
                />
                <Button
                    type='submit'
                    label='Войти'
                    size='md'
                    className={bem.element('btn')}
                />
            </Form>
        </div>
    );
}
