import * as React from 'react';
import './CurrencyTable.scss';
import {useBem, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import getCurrencyList from 'store/actions/currency';
import {selectorCurrencyList, selectorCurrencyListIsLoading} from 'store/reducers/currency';

export default function CurrencyTable() {
    const bem = useBem('CurrencyTable');
    const dispatch = useDispatch();

    const currencyList = useSelector(selectorCurrencyList);
    const isLoading = useSelector(selectorCurrencyListIsLoading);

    React.useEffect(() => {
        dispatch(getCurrencyList(1, ['RUB', 'USD', 'EUR', 'CNY']));
    }, [dispatch]);

    return (
        <div className={bem.block()}>
            {isLoading ? (
                <div>Загрузка...</div>
            ) : (
                currencyList?.map((item, index) => (
                    <div>
                        <div>{item.label}</div>
                    </div>
                ))
            )}
            {/* <Grid
                listId="GridLoadMoreDemo"
                items={[
                    {id: 1, name: 'USD', iso: 23432},
                    {id: 2, name: 'RUB'},
                ]}
                columns={[
                    {label: '№', attribute: 'number'},
                    {label: 'ISO', attribute: 'iso'},
                    {label: 'Name', attribute: 'name'},
                    {label: 'Value', attribute: 'value'},
                ]}
                pagination={{
                    loadMore: true,
                }}
                paginationSize={{
                    defaultValue: 2,
                    sizes: [2, 3, 4],
                }}
            /> */}
        </div>
    );
}
