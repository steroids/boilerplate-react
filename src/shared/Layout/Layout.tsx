import * as React from 'react';

import {useBem} from '@steroidsjs/core/hooks';
import {Notifications} from '@steroidsjs/core/ui/layout';

import Header from 'shared/Header';

import './Layout.scss';

export default function Layout(props: React.PropsWithChildren<any>) {
    const bem = useBem('Layout');

    return (
        <div className={bem.block()}>
            <Header />
            <div className={bem.element('content')}>
                <Notifications />
                {props.children}
            </div>
        </div>
    );
}
