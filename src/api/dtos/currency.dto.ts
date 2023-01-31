import {CurrencyIso, ExchangeRates} from '../../core/models';

export interface ICurrencyDto {
    /** Текущая базовая валюта. */
    base: CurrencyIso;

    /** Дата запроса. */
    date: string;

    /** Список валют и их соотношение между базовой валютой. */
    rates: ExchangeRates;

    /** Статус запроса. */
    success: boolean;

    /** Временная метка последнего обновления валютных пар. */
    timestamp: number;
}
