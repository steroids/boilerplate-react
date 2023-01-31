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
    numberOfCurrencies: 25,
};

const DEFAULT_PAGINATION_SIZE = 4;

export default function CurrencyTable() {
    const bem = useBem('CurrencyTable');
    const dispatch = useDispatch();

    const currencyList = useSelector(selectCurrencyList);
    const isLoading = useSelector(selectCurrencyListIsLoading);

    const table = getCurrencyTable('currencyTable', DEFAULT_QUERY_PARAMS.currencies);

    const items = React.useMemo(
        () =>
            currencyList.map((currency) => ({
                id: currency.id,
                iso: currency.iso,
                label: currency.label,
                ...currency.rates,
            })),
        [currencyList],
    );

    React.useEffect(() => {
        if (currencyList.length) {
            return;
        }
        dispatch(getCurrencyList(DEFAULT_QUERY_PARAMS));
    }, [currencyList.length, dispatch]);

    return (
        <>
            {isLoading ? (
                <div>Загрузка...</div>
            ) : (
                <div className={bem.block()}>
                    <Grid
                        className={bem.element('grid')}
                        listId={table.listId}
                        items={items}
                        columns={table.columns}
                        paginationSize={{
                            defaultValue: DEFAULT_PAGINATION_SIZE,
                            sizes: [],
                        }}
                        pagination={{
                            loadMore: true,
                        }}
                        sort={{enable: true, defaultValue: 'id'}}
                    />
                </div>
            )}
        </>
    );
}
