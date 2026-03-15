import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';

import RolesFormPage from './RolesFormPage';
import RolesGridPage from './RolesGridPage';
import UsersFormPage from './UsersFormPage';
import UsersGridPage from './UsersGridPage';
import {
    PERMISSION_AUTH_ROLE_EDIT,
    PERMISSION_AUTH_ROLE_VIEW,
    PERMISSION_USER_USER_EDIT,
    PERMISSION_USER_USER_VIEW,
} from '../constants/permissions';
import {
    ROUTE_USER, ROUTE_USER_ROLES, ROUTE_USER_ROLES_CREATE, ROUTE_USER_ROLES_UPDATE,
    ROUTE_USER_USERS,
    ROUTE_USER_USERS_CREATE,
    ROUTE_USER_USERS_UPDATE,
} from '../constants/routes';

export default {
    [ROUTE_USER]: {
        label: __('Пользователи'),
        path: 'work',
        exact: true,
        redirectTo: true,
        isNavVisible: true,
        items: {
            [ROUTE_USER_USERS]: {
                label: __('Пользователи'),
                path: 'users',
                exact: true,
                component: UsersGridPage,
                isNavVisible: true,
                roles: [PERMISSION_USER_USER_VIEW],
                items: {
                    [ROUTE_USER_USERS_CREATE]: {
                        label: __('Добавление пользователя'),
                        exact: true,
                        path: 'create',
                        component: UsersFormPage,
                        roles: [PERMISSION_USER_USER_EDIT],
                    },
                    [ROUTE_USER_USERS_UPDATE]: {
                        label: __('Редактирование пользователя'),
                        exact: true,
                        path: ':userId',
                        component: UsersFormPage,
                        roles: [PERMISSION_USER_USER_EDIT],
                    },
                },
            },
            [ROUTE_USER_ROLES]: {
                label: __('Роли'),
                path: 'roles',
                exact: true,
                component: RolesGridPage,
                isNavVisible: true,
                roles: [PERMISSION_AUTH_ROLE_VIEW],
                items: {
                    [ROUTE_USER_ROLES_CREATE]: {
                        label: __('Добавление роли'),
                        exact: true,
                        path: 'create',
                        component: RolesFormPage,
                        roles: [PERMISSION_AUTH_ROLE_EDIT],
                    },
                    [ROUTE_USER_ROLES_UPDATE]: {
                        label: __('Редактирование роли'),
                        exact: true,
                        path: ':roleId',
                        component: RolesFormPage,
                        roles: [PERMISSION_AUTH_ROLE_EDIT],
                    },
                },
            },
        },
    } as IRouteItem,
};
