import {CurrencyIso} from 'core/utils/currencyList';
import {ExchangeRates} from './exchange-rates';

/** Валютные пары. */
export class CurrencyPairs {
    /** Курс валют относительно базовой валюты. */
    readonly rates: ExchangeRates[];

    /** Временная метка последнего обновления валютных пар. */
    readonly timestamp: number;

    public constructor(data: CurrencyPairs) {
        this.rates = data.rates;
        this.timestamp = data.timestamp;
    }
}

/** Валюта. */
export interface Currency {
    /** Идентификатор валюты. */
    readonly id: number;

    /** ISO валюты. */
    readonly iso: CurrencyIso;

    /** Название валюты. */
    readonly label: string;

    /** Валютные пары. */
    currencyPairs: Partial<CurrencyPairs>;
}
