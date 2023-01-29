import * as React from 'react';
import './CurrencyConversionForm.scss';
import {useBem, useSelector} from '@steroidsjs/core/hooks';

import {selectorFormOne, selectorFormTwo} from 'store/reducers/converter';
import CurrencyConversion from './views/CurrencyConversion';

export default function CurrencyConversionForm() {
    const bem = useBem('CurrencyConversionForm');

    const formOne = useSelector(selectorFormOne);
    const formTwo = useSelector(selectorFormTwo);

    return (
        <div className={bem.block()}>
            <CurrencyConversion formName='formOne' form={formOne} />
            <CurrencyConversion formName='formTwo' form={formTwo} />
        </div>
    );
}
