import {CurrencyIso} from 'core/utils/currencyList';

/** Параметры для получения валютных пар относительно базовой валюты. */
export interface PairsQueryParams {
    /** Текущая базовая валюта. */
    readonly baseCurrency: CurrencyIso;

    /** Список валют, относительно которых будут получен курс с базовой. */
    readonly currencyList: readonly CurrencyIso[];
}

/** Параметры для получения списка валют. */
export interface ListQueryParams {
    /** Валюты, с которыми необходимо составить пары. */
    readonly currencies: CurrencyIso[];

    /** Количество валют, которые необходимо извлечь с API. */
    readonly numberOfCurrencies: number;
}
