import {goToRoute} from '@steroidsjs/core/actions/router';
import {useBem, useComponents, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import useLayout, {STATUS_OK, STATUS_LOADING, STATUS_ACCESS_DENIED} from '@steroidsjs/core/hooks/useLayout';
import {isAuthorized} from '@steroidsjs/core/reducers/auth';
import {getRoute, getRouteId} from '@steroidsjs/core/reducers/router';
import {Loader, Notifications} from '@steroidsjs/core/ui/layout';
import Portal from '@steroidsjs/core/ui/layout/Portal';
import ModalPortal from '@steroidsjs/core/ui/modal/ModalPortal';
import * as React from 'react';
import {useEffect} from 'react';

import {LAYOUT_AUTH} from '../../config/layouts';
import {ROUTE_LOGIN, ROUTE_ROOT} from '../../modules/main/constants/routes';
import Sidebar from '../Sidebar';

import './Layout.scss';

export default function Layout(props: React.PropsWithChildren<any>) {
    const bem = useBem('Layout');
    const {http} = useComponents();
    const dispatch = useDispatch();

    const isAuth = useSelector(state => isAuthorized(state));
    const layout = useSelector(state => getRoute(state).layout);
    const routeId = useSelector(state => getRouteId(state));

    const {status} = useLayout(async () => {
        let response = {
            user: null,
        } as any;
        try {
            response = await http.post('/api/v1/init', {
                timestamp: Date.now(),
            });
        } catch (e) {
            // Если init возвращает ошибку Unauthorized, выполняем повторную инициализацию
            if (e.response?.status !== 401) {
                throw e;
            }
        }

        return response;
    });

    useEffect(
        () => {
            if (status === STATUS_ACCESS_DENIED) {
                if (routeId === ROUTE_LOGIN && isAuth) {
                    dispatch(goToRoute(ROUTE_ROOT));
                } else if (!isAuth) {
                    dispatch(goToRoute(ROUTE_LOGIN));
                }
            }
        },
        [status, isAuth, dispatch],
    );

    if (status !== STATUS_OK) {
        return (
            <div className={bem.block()}>
                <div className={bem.element('loader')}>
                    {status === STATUS_LOADING
                        ? (
                            <Loader
                                size='lg'
                            />
                        )
                        : (
                            <div className={bem.element('loader-status')}>
                                {status}
                            </div>
                        )}
                </div>
            </div>
        );
    }

    return (
        <div className={bem.block()}>
            <div className={bem.element('wrapper')}>
                {layout !== LAYOUT_AUTH && (
                    <div className={bem.element('sidebar')}>
                        <Sidebar />
                    </div>
                )}
                <div className={bem.element('content')}>
                    {props.children}
                </div>
                <Notifications />
                <ModalPortal />
                {!process.env.IS_SSR && (
                    <Portal />
                )}
            </div>
        </div>
    );
}
