import {ExchangeRates} from './exchange-rates';

class Currency {
    /** Current base currency. */
    readonly base: string;

    /** List of currencies and their ratio between the base currency. */
    readonly rates: ExchangeRates[];

    /** Timestamp of the last update of currency pairs. */
    readonly timestamp: number;

    public constructor(data: Currency) {
        this.base = data.base;
        this.rates = data.rates;
        this.timestamp = data.timestamp;
    }
}

export default Currency;
