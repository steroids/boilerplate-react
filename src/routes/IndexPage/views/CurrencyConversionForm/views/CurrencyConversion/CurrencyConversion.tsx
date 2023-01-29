import React, {useCallback, useMemo} from 'react';
import './CurrencyConversion.scss';
import {useBem, useDispatch} from '@steroidsjs/core/hooks';
import {DropDownField, NumberField} from '@steroidsjs/core/ui/form';

import {CurrencyService} from 'api/service';
import {DEFAULT_QUERY_PARAMS} from 'core/constants/currencyList';
import updateForm from 'store/actions/converter';
import {IFormState} from 'store/types/converter';

interface CurrencyConversionProps {
    formName: string;
    form: IFormState;
}

function CurrencyConversion(props: CurrencyConversionProps) {
    const {form, formName} = props;

    const bem = useBem('CurrencyConversion');
    const dispatch = useDispatch();

    /** @todo Использовать лист из стейта. */
    const currencyList = CurrencyService.selectCurrencies(DEFAULT_QUERY_PARAMS);

    const items = useMemo(
        () =>
            currencyList.map((item) => ({
                id: item.id,
                label: `${item.iso} - ${item.label}`,
            })),
        [currencyList],
    );

    const onChangeInput = useCallback(
        (value: string) => {
            dispatch(
                updateForm({
                    formId: formName,
                    inputValue: value,
                }),
            );
        },
        [dispatch, formName],
    );

    const onChangeSelect = useCallback(
        (value: string) => {
            dispatch(
                updateForm({
                    formId: formName,
                    inputValue: form.input,
                    /**
                     * @todo Сюда надо передавать не ID, а отношение к рублю.
                     * Поправить Стейт. Сделать, чтобы value было объектом, где будет id и отношение к рублю.
                     */
                    currencyId: Number(value),
                }),
            );
        },
        [dispatch, form.input, formName],
    );

    return (
        <div className={bem.block()}>
            <NumberField type='text' className={bem.element('input')} value={form.input} onChange={onChangeInput} />
            <div>
                <DropDownField
                    className={bem.element('select')}
                    items={items}
                    value={form.select}
                    autoComplete
                    onChange={onChangeSelect}
                />
            </div>
        </div>
    );
}

export default CurrencyConversion;
