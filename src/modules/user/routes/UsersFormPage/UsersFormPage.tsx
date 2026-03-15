import {showNotification} from '@steroidsjs/core/actions/notifications';
import {goToRoute} from '@steroidsjs/core/actions/router';
import {useBem, useDispatch, useFetch, useSelector} from '@steroidsjs/core/hooks';
import {getRouteParam, getRouteParams} from '@steroidsjs/core/reducers/router';
import {Button, Form, InputField, TextField} from '@steroidsjs/core/ui/form';
import {Loader} from '@steroidsjs/core/ui/layout';
import React, {useCallback, useMemo} from 'react';

import {apiUsers, IUserDetailSchema, IUserSaveDto} from 'api/user/users';
import LayoutContent from 'shared/LayoutContent';
import LayoutTitle from 'shared/LayoutTitle';

import {ROUTE_USER_USERS} from '../../constants/routes';

import './UsersFormPage.scss';

const USERS_FORM_PAGE_FORM_ID = 'UsersFormPage_Form';

export default function UsersFormPage() {
    const bem = useBem('CrudEditPageWrapper');
    const dispatch = useDispatch();

    const userId = useSelector(state => getRouteParam(state, 'userId'));
    const routeParams = useSelector(state => getRouteParams(state));
    const isUpdate = !!userId;

    const {data: user, isLoading} = useFetch(
        useMemo(
            () => userId && ({
                method: apiUsers.getById.method,
                url: apiUsers.getById.urlBuilder({
                    userId,
                }),
            }),
            [userId],
        ),
    ) as {data: IUserDetailSchema, isLoading: boolean};

    const onComplete = useCallback(() => {
        dispatch([
            showNotification(isUpdate
                ? __('Пользователь обновлён')
                : __('Пользователь добавлен')),
            goToRoute(ROUTE_USER_USERS, {
                ...routeParams,
                userId: undefined,
            }),
        ]);
    }, [dispatch, isUpdate, routeParams]);

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <div className={bem.block()}>
            <LayoutTitle />
            <LayoutContent>
                <Form
                    formId={USERS_FORM_PAGE_FORM_ID}
                    actionMethod={isUpdate
                        ? apiUsers.update.method
                        : apiUsers.create.method}
                    action={isUpdate
                        ? apiUsers.update.urlBuilder({
                            userId,
                        })
                        : apiUsers.create.urlBuilder()}
                    onComplete={onComplete}
                    className={bem.element('form')}
                    initialValues={user}
                >
                    <InputField
                        attribute={'name' satisfies keyof IUserSaveDto}
                        label={__('Имя')}
                    />
                    <InputField
                        attribute={'email' satisfies keyof IUserSaveDto}
                        label={__('Email')}
                    />
                    <TextField
                        attribute={'about' satisfies keyof IUserSaveDto}
                        label={__('О себе')}
                    />
                    <Button
                        type='submit'
                        label={isUpdate
                            ? __('Сохранить')
                            : __('Добавить')}
                    />
                </Form>
            </LayoutContent>
        </div>
    );
}
