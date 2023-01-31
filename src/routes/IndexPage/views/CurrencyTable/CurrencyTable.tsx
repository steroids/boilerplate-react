import * as React from 'react';
import './CurrencyTable.scss';
import Grid from '@steroidsjs/core/ui/list/Grid';
import {useBem, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import getCurrencyList from 'store/actions/currency';
import {selectCurrencyList, selectCurrencyListIsLoading} from 'store/reducers/currency';
import {IListQueryParams} from 'core/models';
import getCurrencyTable from './utils';

/** Дефолтные параметры для запроса. Можно менять. */
export const DEFAULT_QUERY_PARAMS: IListQueryParams = {
    currencies: ['RUB', 'USD', 'EUR', 'CNY'],
    numberOfCurrencies: 2,
};

const DEFAULT_PAGINATION_SIZE = 3;

export default function CurrencyTable() {
    const bem = useBem('CurrencyTable');
    const dispatch = useDispatch();

    const currencyList = useSelector(selectCurrencyList);
    const isLoading = useSelector(selectCurrencyListIsLoading);

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
                        ...currency.rates,
                    }))}
                    columns={table.columns}
                    paginationSize={{
                        defaultValue: DEFAULT_PAGINATION_SIZE,
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
