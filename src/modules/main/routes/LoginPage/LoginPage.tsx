import {login} from '@steroidsjs/core/actions/auth';
import {useBem} from '@steroidsjs/core/hooks';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import {Button, Form, InputField, PasswordField} from '@steroidsjs/core/ui/form';
import * as React from 'react';
import {useCallback} from 'react';

import {apiAuth, IAuthLoginDto} from 'api/auth/auth';
import {ROUTE_ROOT} from 'modules/main/constants/routes';

import './LoginPage.scss';

export default function LoginPage() {
    const bem = useBem('LoginPage');
    const dispatch = useDispatch();

    const onComplete = useCallback(
        (e, response) => {
            if (response.accessToken) {
                dispatch(login(
                    response.accessToken,
                    ROUTE_ROOT,
                    {
                        ...response,
                    },
                ));
            }
        },
        [dispatch],
    );

    return (
        <div className={bem.block()}>
            <div className={bem.element('auth')}>
                <div className={bem.element('header')}>
                    <p className={bem.element('title')}>
                        {__('Boilerplate12345')}
                    </p>
                </div>
                <Form
                    formId='authForm'
                    actionMethod={apiAuth.login.method}
                    action={apiAuth.login.urlBuilder()}
                    onComplete={onComplete}
                >
                    <InputField
                        attribute={'login' satisfies keyof IAuthLoginDto}
                        size='lg'
                        placeholder={__('Логин')}
                    />
                    <PasswordField
                        attribute={'password' satisfies keyof IAuthLoginDto}
                        type='password'
                        size='lg'
                        placeholder={__('Пароль')}
                    />
                    <Button
                        className={bem.element('button')}
                        color='primary'
                        label={__('Войти')}
                        size='lg'
                        block
                        type='submit'
                    />
                </Form>
            </div>
        </div>
    );
}
