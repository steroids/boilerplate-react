import {useBem, useSelector} from '@steroidsjs/core/hooks';
import useLayout, {STATUS_OK, STATUS_LOADING} from '@steroidsjs/core/hooks/useLayout';
import {getRoute} from '@steroidsjs/core/reducers/router';
import {Notifications} from '@steroidsjs/core/ui/layout';
import Header from '@steroidsjs/core/ui/layout/Header';
import Portal from '@steroidsjs/core/ui/layout/Portal';
import ModalPortal from '@steroidsjs/core/ui/modal/ModalPortal';
import * as React from 'react';

import {ROUTE_ROOT} from '../../routes';
import Sidebar from './views/Sidebar';

import './Layout.scss';

export default function Layout(props: React.PropsWithChildren<any>) {
    const bem = useBem('Layout');

    //const components = useComponents();
    // eslint-disable-next-line no-inline-comments
    const {status} = useLayout(/*() => components.http.post('/api/v1/init')*/);
    const isLoginRoute = useSelector(state => getRoute(state)?.role === 'login');

    if (status !== STATUS_OK) {
        return status !== STATUS_LOADING ? status : null;
    }

    if (isLoginRoute) {
        return (
            <div className={bem.block('login')}>
                <Notifications />
                <ModalPortal />
                <main role='main'>
                    {props.children}
                </main>
            </div>
        );
    }

    return (
        <div className={bem.block()}>
            <Header
                logo={{
                    title: 'Boilerplate12345',
                }}
                nav={{
                    items: ROUTE_ROOT,
                }}
            />
            <Sidebar />
            <div className={bem.element('content')}>
                <Notifications />
                {props.children}
                <ModalPortal />
                {
                    process.env.IS_SSR
                        ? null
                        : <Portal />
                }
            </div>
        </div>
    );
}
