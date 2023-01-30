import * as React from 'react';
import './CurrencyConversionForm.scss';
import {useBem, useSelector} from '@steroidsjs/core/hooks';

import {selectorError, selectorFormOne, selectorFormTwo} from 'store/reducers/converter';
import {CONVERSION_FORM_ONE, CONVERSION_FORM_TWO} from 'core/constants/currencyList';
import CurrencyConversion from './views/CurrencyConversion';

export default function CurrencyConversionForm() {
    const bem = useBem('CurrencyConversionForm');

    const formOne = useSelector(selectorFormOne);
    const formTwo = useSelector(selectorFormTwo);
    const error = useSelector(selectorError);

    return (
        <>
            {/* {error || ( */}
            <div className={bem.block()}>
                <CurrencyConversion
                    formName={CONVERSION_FORM_ONE}
                    form={formOne}
                    oppositeFormName={CONVERSION_FORM_TWO}
                />
                <CurrencyConversion
                    formName={CONVERSION_FORM_TWO}
                    form={formTwo}
                    oppositeFormName={CONVERSION_FORM_ONE}
                />
            </div>
            {/* )} */}
        </>
    );
}
