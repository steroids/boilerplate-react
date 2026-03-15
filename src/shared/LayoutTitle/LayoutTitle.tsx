import {useBem, useSelector} from '@steroidsjs/core/hooks';
import {getRoute, getRouteId} from '@steroidsjs/core/reducers/router';
import {Breadcrumbs} from '@steroidsjs/core/ui/nav';
import {Title} from '@steroidsjs/core/ui/typography';
import React from 'react';

import './LayoutTitle.scss';

interface ILayoutTitleProps {
    title?: string,
    hideTitle?: boolean,
    children?: any,
}

export default function LayoutTitle(props: ILayoutTitleProps) {
    const bem = useBem('LayoutTitle');
    const routeId = useSelector(state => getRouteId(state));
    const label = useSelector(state => getRoute(state)?.label || '');

    return (
        <div className={bem.block()}>
            <Breadcrumbs
                className={bem.block()}
                pageId={routeId}
                pageTitle={props.title || label}
                showIcon
            />
            {!props.hideTitle && (
                <div className={bem.element('title')}>
                    <Title
                        type='h1'
                        content={props.title || label}
                    />
                    {props.children}
                </div>
            )}
        </div>
    );
}
