import * as React from 'react';
import './CurrencyConversionForm.scss';
import {useBem, useComponents, useDispatch} from '@steroidsjs/core/hooks';
import {DropDownField, InputField, Form} from '@steroidsjs/core/ui/form';
import {CurrencyService} from 'api/service';
import {DEFAULT_QUERY_PARAMS} from 'core/constants/currencyList';

export default function CurrencyConversionForm() {
    const bem = useBem('CurrencyConversionForm');

    const [form, setForm] = React.useState({});

    const currencyList = CurrencyService.selectCurrencies(DEFAULT_QUERY_PARAMS);

    const onChangeSelect = (value: number) => {
        setForm({...form, select: value, input: 0});
        return null;
    };

    return (
        <div className={bem.block()}>
            <Form
                className={bem.element('form')}
                layout='inline'
                formId='conversionFormFirst'
                isBordered
                initialValues={form}
                useRedux
                fields={[
                    {
                        className: bem.element('input'),
                        attribute: 'input',
                        component: InputField,
                    },
                    {
                        className: bem.element('select'),
                        attribute: 'select',
                        component: DropDownField,
                        items: currencyList,
                        onChange: onChangeSelect,
                    },
                ]}
            />
            <Form
                className={bem.element('form')}
                layout='inline'
                formId='conversionFormSecond'
                isBordered
                useRedux
                fields={[
                    {
                        className: bem.element('input'),
                        attribute: 'input',
                        component: InputField,
                    },
                    {
                        className: bem.element('select'),
                        attribute: 'select',
                        component: DropDownField,
                        autoComplete: true,
                        items: currencyList,
                        selectFirst: true,
                    },
                ]}
            />
        </div>
    );
}
