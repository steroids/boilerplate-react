import CurrencyPairs from './currency-pairs';

/** Валюта. */
export interface Currency {
    /** Идентификатор валюты. */
    id: number;

    /** Название валюты. */
    label: string;

    /** Валютные пары. */
    currencyPairs: CurrencyPairs;
}
