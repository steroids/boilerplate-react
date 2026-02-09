import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';

import IndexPage from './IndexPage';
import LoginPage from './LoginPage';

export const ROUTE_ROOT = 'root';
export const ROUTE_USERS = 'users';
export const ROUTE_LOGIN = 'login';

const roles = [null];

export default {
    id: ROUTE_ROOT,
    exact: true,
    path: '/',
    component: IndexPage,
    label: __('Главная'),
    roles,
    items: {
        [ROUTE_USERS]: {
            id: ROUTE_USERS,
            label: __('Пользователи'),
            path: '/users',
            component: IndexPage,
            roles,
        },
        [ROUTE_LOGIN]: {
            id: ROUTE_LOGIN,
            role: 'login',
            label: 'Авторизация',
            path: '/login',
            component: LoginPage,
            componentProps: {
                loginUrl: '/api/v1/admin/auth/login',
            },
            roles: [null],
            isNavVisible: false,
        },
    },
} as IRouteItem;
