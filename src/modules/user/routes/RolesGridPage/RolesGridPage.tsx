import {listFetch} from '@steroidsjs/core/actions/list';
import {useComponents, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import useBem from '@steroidsjs/core/hooks/useBem';
import {getUser} from '@steroidsjs/core/reducers/auth';
import {Button} from '@steroidsjs/core/ui/form';
import Grid from '@steroidsjs/core/ui/list/Grid';
import React from 'react';

import {apiRoles, IRoleSchema} from 'api/auth/roles';
import LayoutContent from 'shared/LayoutContent';
import LayoutTitle from 'shared/LayoutTitle';

import {PERMISSION_AUTH_ROLE_EDIT} from '../../constants/permissions';
import {ROUTE_USER_ROLES_CREATE, ROUTE_USER_ROLES_UPDATE} from '../../constants/routes';

import './RolesGridPage.scss';

const ROLES_GRID_PAGE_GRID_ID = 'RolesGridPage_Grid';
const ROLES_GRID_PAGE_GRID_COLUMNS = [
    {
        label: __('ИД'),
        attribute: 'id' satisfies keyof IRoleSchema,
    },
    {
        label: __('Название'),
        attribute: 'title' satisfies keyof IRoleSchema,
    },
];

export default function RolesGridPage() {
    const bem = useBem('RolesGridPage');
    const dispatch = useDispatch();
    const {http} = useComponents();

    const user = useSelector(state => getUser(state));

    return (
        <div className={bem.block()}>
            <LayoutTitle>
                {user?.roles?.includes(PERMISSION_AUTH_ROLE_EDIT) && (
                    <Button
                        label='Добавить роль'
                        toRoute={ROUTE_USER_ROLES_CREATE}
                        tag='a'
                        icon='create'
                    />
                )}
            </LayoutTitle>
            <LayoutContent>
                <Grid
                    listId={ROLES_GRID_PAGE_GRID_ID}
                    actionMethod={apiRoles.search.method}
                    action={apiRoles.search.urlBuilder()}
                    columns={ROLES_GRID_PAGE_GRID_COLUMNS}
                    controls={item => ([
                        {
                            id: 'update',
                            icon: 'update',
                            label: null,
                            outline: false,
                            toRoute: ROUTE_USER_ROLES_UPDATE,
                            toRouteParams: {
                                roleId: item.id,
                            },
                        },
                        {
                            id: 'delete',
                            icon: 'delete',
                            label: null,
                            outline: false,
                            confirm: __('Удалить роль?'),
                            onClick: async () => {
                                await http.send(
                                    apiRoles.delete.method,
                                    apiRoles.delete.urlBuilder({
                                        roleId: item.id,
                                    }),
                                );

                                dispatch(listFetch(ROLES_GRID_PAGE_GRID_ID));
                            },
                        },
                    ])}
                    paginationSize={{
                        enable: false,
                        defaultValue: 100,
                    }}
                />
            </LayoutContent>
        </div>
    );
}
