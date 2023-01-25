import * as React from 'react';

import './CurrencyTable.scss';
import {useBem} from '@steroidsjs/core/hooks';

export default function CurrencyTable() {
    const bem = useBem('CurrencyTable');

    return <div className={bem.block()}>Table</div>;
}
