import {formChange} from '@steroidsjs/core/actions/form';
import {showNotification} from '@steroidsjs/core/actions/notifications';
import {goToRoute} from '@steroidsjs/core/actions/router';
import {useBem, useComponents, useDispatch, useFetch, useSelector} from '@steroidsjs/core/hooks';
import {getRouteParam, getRouteParams} from '@steroidsjs/core/reducers/router';
import {Button, CheckboxField, DateField, DropDownField, Form, InputField, TextField} from '@steroidsjs/core/ui/form';
import {Loader} from '@steroidsjs/core/ui/layout';
import React, {useCallback, useMemo} from 'react';

import {apiPermissions, IPermissionTreeSchema} from 'api/auth/permissions';
import {apiRoles, IRoleDetailSchema, IRoleSaveDto, IRoleSchema} from 'api/auth/roles';

import PermissionsTreeField from './views/PermissionsTreeField';
import {ISearchSchema} from '../../../../api/utils';
import LayoutContent from '../../../../shared/LayoutContent';
import LayoutTitle from '../../../../shared/LayoutTitle';
import {ROUTE_USER_ROLES} from '../../constants/routes';

import './RolesFormPage.scss';

const ROLES_FORM_PAGE_FORM_ID = 'RolesFormPage_Form';

export default function RolesFormPage() {
    const bem = useBem('RolesFormPage');
    const {http} = useComponents();
    const dispatch = useDispatch();

    const roleId = useSelector(state => getRouteParam(state, 'roleId'));
    const routeParams = useSelector(state => getRouteParams(state));
    const isUpdate = !!roleId;

    const {data: role, isLoading} = useFetch(
        useMemo(
            () => roleId && ({
                method: apiRoles.getById.method,
                url: apiRoles.getById.urlBuilder({
                    roleId,
                }),
            }),
            [roleId],
        ),
    ) as {data: IRoleDetailSchema, isLoading: boolean};

    const {data: permissionsTree, isLoading: isPermissionsLoading} = useFetch(
        useMemo(
            () => ({
                method: apiPermissions.getTree.method,
                url: apiPermissions.getTree.urlBuilder(),
            }),
            [],
        ),
    ) as {data: IPermissionTreeSchema, isLoading: boolean};

    const onParentIdChange = useCallback(
        async (parentId?: string) => {
            const permissionsResponse: {data?: IRoleDetailSchema} = parentId
                ? await http.send(
                    apiRoles.getById.method,
                    apiRoles.getById.urlBuilder({
                        roleId: parentId,
                    }),
                )
                : null;
            dispatch(
                formChange(
                    ROLES_FORM_PAGE_FORM_ID,
                    'permissionKeys',
                    permissionsResponse?.data?.permissionKeys,
                ),
            );
        },
        [dispatch, http],
    );

    const onComplete = useCallback(() => {
        dispatch([
            showNotification(isUpdate
                ? __('Роль обновлена')
                : __('Роль добавлена')),
            goToRoute(ROUTE_USER_ROLES, {
                ...routeParams,
                roleId: undefined,
            }),
        ]);
    }, [dispatch, isUpdate, routeParams]);

    if (isLoading || isPermissionsLoading) {
        return (
            <Loader />
        );
    }

    return (
        <div className={bem.block()}>
            <LayoutTitle />
            <LayoutContent>
                <Form
                    className={bem.element('form')}
                    formId={ROLES_FORM_PAGE_FORM_ID}
                    actionMethod={isUpdate
                        ? apiRoles.update.method
                        : apiRoles.create.method}
                    action={isUpdate
                        ? apiRoles.update.urlBuilder({
                            roleId,
                        })
                        : apiRoles.create.urlBuilder()}
                    initialValues={role}
                    onComplete={onComplete}
                >
                    <InputField
                        attribute={'title' satisfies keyof IRoleSaveDto}
                        label={__('Название')}
                    />
                    <TextField
                        attribute={'description' satisfies keyof IRoleSaveDto}
                        label={__('Описание')}
                    />
                    <div className='row gap-3'>
                        <div className='col-6'>
                            <DropDownField
                                attribute={'parentId' satisfies keyof IRoleSaveDto}
                                label={__('Наследована от')}
                                dataProvider={{
                                    action: apiRoles.search.urlBuilder(),
                                    actionMethod: apiRoles.search.method,
                                    onSearch: async (url: string, params) => {
                                        const response: {data?: ISearchSchema<IRoleSchema>} = await http
                                            .send(apiRoles.search.method, url, params);
                                        return response?.data?.items.map(item => ({
                                            id: item.id,
                                            label: item.title,
                                        }));
                                    },
                                }}
                                onItemSelect={onParentIdChange}
                                onReset={onParentIdChange}
                                showReset
                                showRemove
                                autoComplete
                            />
                        </div>
                        <div className='col-6'>
                            <DateField
                                attribute={'expireTime' satisfies keyof IRoleSaveDto}
                                label={__('Действует до')}
                            />
                        </div>
                    </div>
                    <CheckboxField
                        attribute={'isActive' satisfies keyof IRoleSaveDto}
                        label={__('Активна?')}
                    />
                    <PermissionsTreeField
                        attribute={'permissionKeys' satisfies keyof IRoleSaveDto}
                        permissionsTree={permissionsTree}
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
