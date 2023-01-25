import {ExchangeRates} from '../../core/models/exchange-rates';

export interface CurrencyDto {
    /** Current base currency. */
    base: string;

    /** Request Date. */
    date: string;

    /** List of currencies and their ratio between the base currency. */
    rates: ExchangeRates[];

    /** Status of the request. */
    success: boolean;

    /** Timestamp of the last update of currency pairs. */
    timestamp: number;
}
