import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';

import {LAYOUT_AUTH} from 'config/layouts';
import {ROUTE_LOGIN, ROUTE_ROOT} from 'modules/main/constants/routes';

import IndexPage from './IndexPage';
import LoginPage from './LoginPage';
import {PERMISSION_AUTH_AUTHORIZED} from '../constants/permissions';

export default {
    id: ROUTE_ROOT,
    exact: true,
    path: '/',
    component: IndexPage,
    roles: [PERMISSION_AUTH_AUTHORIZED, null],
    items: {
        [ROUTE_LOGIN]: {
            label: __('Авторизация'),
            exact: true,
            path: '/login',
            component: LoginPage,
            layout: LAYOUT_AUTH,
            isNavVisible: false,
            roles: [null],
        },
    },
} as IRouteItem;
