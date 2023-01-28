import {CurrencyIso} from 'core/utils/currencyList';

/** Валюты и их обменный курс. */
export type ExchangeRates = {
    readonly [key in CurrencyIso]: number;
};
