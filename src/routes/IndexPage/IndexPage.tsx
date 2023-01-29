import * as React from 'react';

import './IndexPage.scss';
import {useBem} from '@steroidsjs/core/hooks';

import CurrencyTable from './views/CurrencyTable';
import CurrencyConversionForm from './views/CurrencyConversionForm';

export default function IndexPage() {
    const bem = useBem('IndexPage');

    return (
        <div className={bem.block()}>
            <CurrencyConversionForm />
            <CurrencyTable />
        </div>
    );
}
