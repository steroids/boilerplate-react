import {ExchangeRates} from '../../core/models';

export interface CurrencyPairsDto {
    /** Текущая базовая валюта. */
    base: string;

    /** Дата запроса. */
    date: string;

    /** Список валют и их соотношение между базовой валютой. */
    rates: ExchangeRates[];

    /** Статус запроса. */
    success: boolean;

    /** Временная метка последнего обновления валютных пар. */
    timestamp: number;
}
