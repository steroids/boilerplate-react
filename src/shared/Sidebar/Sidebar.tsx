import {useBem, useSelector} from '@steroidsjs/core/hooks';
import {getUser} from '@steroidsjs/core/reducers/auth';
import {getActiveRouteIds, getRouteChildren} from '@steroidsjs/core/reducers/router';
import {Link} from '@steroidsjs/core/ui/nav';
import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';
import React from 'react';

import {SITE_TITLE} from '../../config/site';
import {ROUTE_ROOT} from '../../modules/main/constants/routes';

import './Sidebar.scss';

export default function Sidebar() {
    const bem = useBem('Sidebar');

    const routes = useSelector(state => getRouteChildren(state, ROUTE_ROOT));
    const activeRouteIds = useSelector(state => getActiveRouteIds(state) || []);
    const permissions = useSelector(state => getUser(state)?.roles || null);

    // TODO check permissions

    return (
        <aside className={bem.block()}>
            <div className={bem.element('logo')}>
                {SITE_TITLE}
            </div>
            <div className={bem.element('nav-items')}>
                {/*<User />*/}
                {[].concat(routes)
                    .filter(item => item.isNavVisible)
                    .map((item: IRouteItem) => {
                        const subItems = []
                            .concat(item.items || [])
                            .filter((subItem: IRouteItem) => subItem.isNavVisible);

                        return (
                            <div key={item.id}>
                                {item.redirectTo && subItems.length > 0
                                    ? (
                                        <div className={bem.element('nav-title')}>
                                            <span>
                                                {item.label}
                                            </span>
                                        </div>
                                    )
                                    : (
                                        <div
                                            className={bem.element('nav-link', {
                                                active: activeRouteIds.includes(item.id),
                                            })}
                                        >
                                            <Link
                                                label={item.label}
                                                toRoute={item.id}
                                            />
                                        </div>
                                    )}
                                <div className={bem.element('nav-subitems')}>
                                    {subItems.map((subItem: IRouteItem) => (
                                        <div
                                            key={subItem.id}
                                            className={bem.element('nav-link', {
                                                active: activeRouteIds.includes(subItem.id),
                                            })}
                                        >
                                            <Link
                                                label={subItem.label}
                                                toRoute={subItem.id}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </aside>
    );
}
