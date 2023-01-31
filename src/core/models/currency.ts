import {CurrencyList} from 'core/constants/constants';
import {ExchangeRates} from './exchange-rates';

/** Тип валюты. */
export type CurrencyIso = keyof typeof CurrencyList;

/** Валюта. */
export class Currency {
    /** Идентификатор валюты. */
    readonly id: number;

    /** ISO валюты. */
    readonly iso: CurrencyIso;

    /** Название валюты. */
    readonly label: string;

    /** Временная метка последнего обновления валютных пар. */
    readonly timestamp?: number;

    /** Курс валют относительно базовой валюты. */
    readonly rates?: Partial<ExchangeRates>;

    public constructor(data: Currency) {
        this.id = data.id;
        this.iso = data.iso;
        this.label = data.label;
        this.rates = data.rates;
        this.timestamp = data.timestamp;
    }
}
