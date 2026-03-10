import {useBem} from '@steroidsjs/core/hooks';
import * as React from 'react';

import './IndexPage.scss';

export default function IndexPage() {
    const bem = useBem('IndexPage');

    return (
        <div className={bem.block()}>
            Hello!
        </div>
    );
}
