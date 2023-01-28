import {CurrencyIso} from 'core/utils/currencyList';
import {ExchangeRates} from './exchange-rates';

/** Валютные пары. */
export class CurrencyPairs {
    /** Текущая базовая валюта. */
    readonly baseCurrency: CurrencyIso;

    /** Курс валют относительно базовой валюты. */
    readonly rates: ExchangeRates[];

    /** Временная метка последнего обновления валютных пар. */
    readonly timestamp: number;

    public constructor(data: CurrencyPairs) {
        this.baseCurrency = data.baseCurrency;
        this.rates = data.rates;
        this.timestamp = data.timestamp;
    }
}

/** Валюта. */
export interface Currency {
    /** Идентификатор валюты. */
    id: number;

    /** Название валюты. */
    label: string;

    /** Валютные пары. */
    currencyPairs: CurrencyPairs;
}
