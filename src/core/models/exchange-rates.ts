import {CurrencyIso} from 'core/models';

/** Валюты и их обменный курс. */
export type ExchangeRates = {
    readonly [key in CurrencyIso]: number;
};
