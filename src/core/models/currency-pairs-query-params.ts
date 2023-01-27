import {CurrencyIso} from 'core/utils/currencyList';

/** Параметры, содержащихся в URL, для получения базовой валюты и ее валютных пар. */
export interface PairsQueryParams {
    /** Текущая базовая валюта. */
    readonly baseCurrency: CurrencyIso;

    /** Список валют, относительно которых будут получен курс с базовой. */
    readonly currencyList: readonly CurrencyIso[];
}
