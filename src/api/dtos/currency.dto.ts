import {CurrencyIso} from 'core/utils/currencyList';
import {ExchangeRates} from '../../core/models/exchange-rates';

export interface CurrencyDto {
    /** Current base currency. */
    base: CurrencyIso;

    /** Request Date. */
    date: string;

    /** List of currencies and their ratio between the base currency. */
    rates: ExchangeRates[];

    /** Status of the request. */
    success: boolean;

    /** Timestamp of the last update of currency pairs. */
    timestamp: number;
}
