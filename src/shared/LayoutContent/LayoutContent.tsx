import {useBem} from '@steroidsjs/core/hooks';
import Card from '@steroidsjs/core/ui/content/Card';
import {Nav} from '@steroidsjs/core/ui/nav';
import React from 'react';

import './LayoutContent.scss';

interface ILayoutContentProps {
    nav?: string,
    children?: any,
    className?: string,
}

export default function LayoutContent(props: ILayoutContentProps) {
    const bem = useBem('LayoutContent');

    return (
        <div className={bem(bem.block(), props.className)}>
            {props.nav && (
                <Nav
                    className={bem.element('tabs')}
                    items={props.nav}
                    layout='tabs'
                />
            )}
            <Card
                className={bem.element('content', {
                    'with-nav': !!props.nav,
                })}
            >
                {props.children}
            </Card>
        </div>
    );
}
