import {CurrencyDto} from 'api/dtos/currency.dto';
import {CurrencyList, CurrencyIso} from 'core/utils/currencyList';
import {CurrencyMapper} from 'core/mappers/currency.mapper';
import {Currency, PairsQueryParams as CurrencyPairsQueryParams} from 'core/models';

import CurrencyPairs from 'core/models/currency-pairs';
import http from '..';

export namespace CurrencyService {
    const currencyUrl = new URL('latest', http.defaults.baseURL);

    /**
     * Извлечь валюту и ее курсы по отношению к другим валютам.
     * @param currencyPairsQueryParams Параметры для получения соотношений валют, содержащихся в URL.
     */
    export async function fetchCurrency(currencyPairsQueryParams: CurrencyPairsQueryParams): Promise<CurrencyPairs> {
        try {
            const {baseCurrency: base, currencyList: symbols} = currencyPairsQueryParams;

            const {data} = await http.get<CurrencyDto>(currencyUrl.toString(), {
                params: {
                    base,
                    symbols: symbols.join(','),
                },
            });
            const currency = CurrencyMapper.fromDto(data);
            return currency;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Получить список валют.
     * @param numberCurrency Количество валют в списке.
     * @param currency Валюты, с которыми сделать пары.
     * @todo Как сделать, чтобы промис оборвался, а не создавалось 140 штук?
     */
    export async function getCurrencyList(numberCurrency: number, currencies: CurrencyIso[]): Promise<Currency[]> {
        const currencyList: Currency[] = [];

        /** @todo Создает кучу промисов. 140 штук. Нужно либо изменить подход, либо искать другую API.
         * Либо найти способ, чтобы промисы map() остановился.
         */
        try {
            // const a = Object.keys(CurrencyList).map(async (iso: CurrencyIso, index) => {
            //     if (index < numberCurrency) {
            //         const currencyPairs = await fetchCurrency({
            //             baseCurrency: iso,
            //             currencyList: currencies,
            //         });
            //         currencyList.push({
            //             id: index + 1,
            //             label: CurrencyList[iso],
            //             currencyPairs,
            //         });
            //     }
            // });
            // await Promise.all(a);
            return currencyList;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
