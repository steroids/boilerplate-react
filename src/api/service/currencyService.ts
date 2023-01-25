import {CurrencyDto} from 'api/dtos/currency.dto';
import {CurrencyMapper} from 'core/mappers/currency.mapper';
import {CurrencyQueryParams} from 'core/models/currency-query-params';
import Currency from 'core/models/сurrency';
import http from '..';

export namespace CurrencyService {
    const currencyUrl = new URL('latest.json?', http.defaults.baseURL);

    /**
     * Fetches a currency and its rates against other currencies.
     * @param currencyQueryParams Parameters for getting currency ratios contained in the URL.
     */
    export async function fetchCurrency(currencyQueryParams: CurrencyQueryParams): Promise<Currency> {
        const {base, symbols} = currencyQueryParams;

        const {data} = await http.get<CurrencyDto>(currencyUrl.toString(), {
            params: {
                base,
                symbols: symbols.join(','),
            },
        });
        const currency = CurrencyMapper.fromDto(data);
        return currency;
    }
}
