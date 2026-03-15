import {listFetch} from '@steroidsjs/core/actions/list';
import {useComponents, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import useBem from '@steroidsjs/core/hooks/useBem';
import {getUser} from '@steroidsjs/core/reducers/auth';
import {Button, Form, InputField} from '@steroidsjs/core/ui/form';
import Grid from '@steroidsjs/core/ui/list/Grid';
import React, {useCallback} from 'react';

import {apiUsers, IUserSchema, IUserSearchDto} from 'api/user/users';
import LayoutContent from 'shared/LayoutContent';
import LayoutTitle from 'shared/LayoutTitle';
import {formatDate} from 'utils/formatDate';
import {formatUserName} from 'utils/formatUser';

import {PERMISSION_USER_USER_EDIT} from '../../constants/permissions';
import {ROUTE_USER_USERS_CREATE, ROUTE_USER_USERS_UPDATE} from '../../constants/routes';

import './UsersGridPage.scss';

const USERS_GRID_PAGE_GRID_ID = 'UsersGridPage_Grid';
const USERS_GRID_PAGE_GRID_COLUMNS = [
    {
        attribute: 'id' satisfies keyof IUserSchema,
        label: __('ИД'),
    },
    {
        attribute: 'name' satisfies keyof IUserSchema,
        label: __('Имя'),
        valueView: ({item}: {item: IUserSchema}) => formatUserName(item),
    },
    {
        attribute: 'email' satisfies keyof IUserSchema,
        label: __('Email'),
    },
    {
        attribute: 'createTime' satisfies keyof IUserSchema,
        label: __('Дата регистрации'),
        valueView: ({item}: {item: IUserSchema}) => formatDate(item.createTime),
    },
];

export default function UsersGridPage() {
    const bem = useBem('UsersGridPage');
    const dispatch = useDispatch();
    const {http} = useComponents();

    const user = useSelector(state => getUser(state));

    const gridControls = useCallback(
        (item: IUserSchema) => ([
            {
                id: 'update',
                icon: 'update',
                label: null,
                outline: false,
                toRoute: ROUTE_USER_USERS_UPDATE,
                toRouteParams: {
                    userId: item.id,
                },
                visible: user?.roles?.includes(PERMISSION_USER_USER_EDIT),
            },
            {
                id: 'delete',
                icon: 'delete',
                label: null,
                outline: false,
                confirm: __('Удалить пользователя?'),
                onClick: async () => {
                    await http.send(
                        apiUsers.delete.method,
                        apiUsers.delete.urlBuilder({
                            userId: item.id,
                        }),
                    );

                    dispatch(listFetch(USERS_GRID_PAGE_GRID_ID));
                },
                visible: user?.roles?.includes(PERMISSION_USER_USER_EDIT),
            },
        ]),
        [dispatch, http, user?.roles],
    );

    return (
        <div className={bem.block()}>
            <LayoutTitle>
                {user?.roles?.includes(PERMISSION_USER_USER_EDIT) && (
                    <Button
                        label='Добавить пользователя'
                        toRoute={ROUTE_USER_USERS_CREATE}
                        tag='a'
                        icon='create'
                    />
                )}
            </LayoutTitle>
            <LayoutContent>
                <Form
                    formId={USERS_GRID_PAGE_GRID_ID}
                    useRedux
                >
                    <div className='row gap-3'>
                        <div className='col-4'>
                            <InputField
                                attribute={'query' satisfies keyof IUserSearchDto}
                                placeholder={__('Поиск по имени / email')}
                            />
                        </div>
                    </div>
                </Form>
                <Grid
                    listId={USERS_GRID_PAGE_GRID_ID}
                    searchForm={{
                        formId: USERS_GRID_PAGE_GRID_ID,
                    }}
                    action={apiUsers.search.urlBuilder()}
                    actionMethod={apiUsers.search.method}
                    columns={USERS_GRID_PAGE_GRID_COLUMNS}
                    controls={gridControls}
                    paginationSize={{
                        enable: false,
                        defaultValue: 100,
                    }}
                />
            </LayoutContent>
        </div>
    );
}
