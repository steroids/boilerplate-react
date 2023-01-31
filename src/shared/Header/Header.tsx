import * as React from 'react';

import {Button} from '@steroidsjs/core/ui/form';
import {useBem, useDispatch, useSelector} from '@steroidsjs/core/hooks';

import getCurrencyList from 'store/actions/currency';
import {selectCurrencyList, selectCurrencyListIsLoading} from 'store/reducers/currency';

import {DEFAULT_QUERY_PARAMS} from '../../routes/IndexPage/views/CurrencyTable';

import './Header.scss';

const MILLISECOND = 1000;

export default function Header() {
    const bem = useBem('Header');
    const dispatch = useDispatch();

    const currencyList = useSelector(selectCurrencyList);
    const isLoading = useSelector(selectCurrencyListIsLoading);

    const date = new Date(currencyList[0]?.timestamp * MILLISECOND);

    const handleClick = () => {
        dispatch(getCurrencyList(DEFAULT_QUERY_PARAMS));
    };

    return (
        <header className={bem.block()}>
            <h3>Конвертер валют</h3>
            <span>{currencyList[0]?.timestamp ? <>{date.toString()}</> : <>Нет данных об обновлении</>}</span>

            <Button color='Primary' label='Обновить данные' onClick={handleClick} disabled={isLoading} />
        </header>
    );
}
