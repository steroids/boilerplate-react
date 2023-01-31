import {CurrencyIso} from 'core/models';

/** Параметры для получения валютных пар относительно базовой валюты. */
export interface IPairsQueryParams {
    /** Текущая базовая валюта. */
    readonly baseCurrency: CurrencyIso;

    /** Валюты, относительно которых будут получен курс с базовой. */
    readonly currencies: CurrencyIso[];
}

/** Параметры для получения списка валют. */
export interface IListQueryParams {
    /** Валюты, с которыми необходимо составить пары. */
    readonly currencies: CurrencyIso[];

    /** Количество валют, которые необходимо извлечь с API. */
    readonly numberOfCurrencies: number;
}
