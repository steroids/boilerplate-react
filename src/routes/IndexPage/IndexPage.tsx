import * as React from 'react';

import {useBem} from '@steroidsjs/core/hooks';

import CurrencyTable from './views/CurrencyTable';
import CurrencyConversionForm from './views/CurrencyConversionForm';

import './IndexPage.scss';

export default function IndexPage() {
    const bem = useBem('IndexPage');

    return (
        <div className={bem.block()}>
            <CurrencyConversionForm />
            <CurrencyTable />
        </div>
    );
}
