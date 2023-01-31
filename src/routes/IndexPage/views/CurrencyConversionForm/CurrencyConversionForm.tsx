import * as React from 'react';
import './CurrencyConversionForm.scss';
import {useBem, useSelector} from '@steroidsjs/core/hooks';

import {selectError, selectFormOne, selectFormTwo} from 'store/reducers/converter';
import {CONVERSION_FORM_ONE, CONVERSION_FORM_TWO} from 'core/constants';
import {selectCurrencyList, selectCurrencyListIsLoading} from 'store/reducers/currency';
import CurrencyConversion from './views/CurrencyConversion';

export default function CurrencyConversionForm() {
    const bem = useBem('CurrencyConversionForm');

    const formOne = useSelector(selectFormOne);
    const formTwo = useSelector(selectFormTwo);
    const error = useSelector(selectError);

    /** @todo Костыль. Исправить. */
    const currencyList = useSelector(selectCurrencyList);
    const isLoading = useSelector(selectCurrencyListIsLoading);

    return (
        <>
            {error && !currencyList[0]?.rates && !isLoading ? (
                <div className={bem.element('error')}>{error}</div>
            ) : null}
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
        </>
    );
}
