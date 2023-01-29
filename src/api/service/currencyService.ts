import {CurrencyPairsDto} from 'api/dtos/currency.dto';
import {CurrencyList} from 'core/constants/currencyList';
import {CurrencyMapper} from 'core/mappers/currency.mapper';
import {Currency, PairsQueryParams, CurrencyPairs, ListQueryParams, CurrencyIso} from 'core/models';
import http from '..';

export namespace CurrencyService {
    const currencyUrl = new URL('latest', http.defaults.baseURL);

    /**
     * Извлечь валюту и ее курсы по отношению к другим валютам.
     * @param pairsQueryParams Параметры для получения соотношений валют, содержащихся в URL.
     */
    export async function fetchCurrency(pairsQueryParams: PairsQueryParams): Promise<CurrencyPairs> {
        try {
            const {data} = await http.get<CurrencyPairsDto>(currencyUrl.toString(), {
                params: {
                    base: pairsQueryParams.baseCurrency,
                    symbols: pairsQueryParams.currencyList.join(','),
                },
            });
            const currency = CurrencyMapper.fromDto(data);
            return currency;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Выбрать валюты для отображения в списке.
     * @param listQueryParams Параметры для получения списка валют.
     */
    export function selectCurrencies(listQueryParams: ListQueryParams) {
        const selectCurrenciesList: Currency[] = [];
        Object.keys(CurrencyList).map(async (iso: CurrencyIso, index) => {
            if (index < listQueryParams.numberOfCurrencies) {
                selectCurrenciesList.push({
                    id: index + 1,
                    label: CurrencyList[iso],
                    iso,
                    currencyPairs: {},
                });
            }
        });
        return selectCurrenciesList;
    }

    /**
     * Получить список валют с заполненным курсом.
     * @param listQueryParams Параметры для получения списка валют.
     */
    export async function getCurrencyList(listQueryParams: ListQueryParams): Promise<Currency[]> {
        const currencyList = selectCurrencies(listQueryParams);
        try {
            // await Promise.all(
            //     currencyList.map(async (currency) => {
            //         currency.currencyPairs = await fetchCurrency({
            //             baseCurrency: currency.iso,
            //             currencyList: listQueryParams.currencies,
            //         });
            //     }),
            // );
            return currencyList;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
