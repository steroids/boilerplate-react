import React, {useCallback, useMemo} from 'react';
import './CurrencyConversion.scss';
import {useBem, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import {DropDownField, NumberField} from '@steroidsjs/core/ui/form';

import {changeInput, changeSelect, IFormState} from 'store/actions/converter';
import {selectorCurrencyList, selectorCurrencyListIsLoading} from 'store/reducers/currency';

interface CurrencyConversionProps {
    form: IFormState;
    formName: string;
    oppositeFormName: string;
}

function CurrencyConversion(props: CurrencyConversionProps) {
    const {form, formName, oppositeFormName} = props;

    const bem = useBem('CurrencyConversion');
    const dispatch = useDispatch();

    const currencyList = useSelector(selectorCurrencyList);
    const isLoading = useSelector(selectorCurrencyListIsLoading);

    const items = useMemo(
        () =>
            currencyList.map((item) => ({
                id: item.id,
                label: `${item.iso} - ${item.label}`,
                pairs: item.rates,
            })),
        [currencyList],
    );

    const onChangeInput = useCallback(
        (value: number) => {
            dispatch(changeInput(formName, value, oppositeFormName));
        },
        [dispatch, formName, oppositeFormName],
    );

    const onChangeSelect = useCallback(
        (value: number) => {
            const changedCurrency = currencyList.find((item) => item.id === value);
            dispatch(changeSelect(formName, changedCurrency, oppositeFormName));
        },
        [currencyList, dispatch, formName, oppositeFormName],
    );

    return (
        <>
            {isLoading ? null : (
                <div className={bem.block()}>
                    <NumberField
                        type='text'
                        className={bem.element('input')}
                        value={form.inputValue}
                        onChange={onChangeInput}
                        step={0.1}
                    />
                    <div>
                        <DropDownField
                            className={bem.element('select')}
                            items={items}
                            value={form.selectValue}
                            autoComplete
                            onChange={onChangeSelect}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default CurrencyConversion;
