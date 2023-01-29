import * as React from 'react';
import './CurrencyTable.scss';
import Grid from '@steroidsjs/core/ui/list/Grid';
import {useBem, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import getCurrencyList from 'store/actions/currency';
import {selectorCurrencyList, selectorCurrencyListIsLoading} from 'store/reducers/currency';
import {DEFAULT_QUERY_PARAMS} from 'core/constants/currencyList';
import getCurrencyTable from './utils';

export default function CurrencyTable() {
    const bem = useBem('CurrencyTable');
    const dispatch = useDispatch();

    const currencyList = useSelector(selectorCurrencyList);
    const isLoading = useSelector(selectorCurrencyListIsLoading);

    const table = getCurrencyTable('currencyTable', DEFAULT_QUERY_PARAMS.currencies);

    React.useEffect(() => {
        if (currencyList.length) {
            return;
        }
        dispatch(getCurrencyList(DEFAULT_QUERY_PARAMS));
    }, [currencyList.length, dispatch]);

    return (
        <div className={bem.block()}>
            {isLoading ? (
                <div>Загрузка...</div>
            ) : (
                <Grid
                    className={bem.element('grid')}
                    listId={table.listId}
                    items={currencyList.map((currency) => ({
                        id: currency.id,
                        iso: currency.iso,
                        label: currency.label,
                        ...currency.currencyPairs.rates,
                    }))}
                    columns={table.columns}
                    paginationSize={{
                        defaultValue: 3,
                        sizes: [],
                    }}
                    pagination={{
                        loadMore: true,
                    }}
                />
            )}
        </div>
    );
}
