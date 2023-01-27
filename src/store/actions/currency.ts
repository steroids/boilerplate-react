import {CurrencyService} from 'api/service';
import {CurrencyIso} from 'core/utils/currencyList';
import {Dispatch} from 'react';
import {CurrencyAction, CurrencyActionTypes} from 'store/types/currency';

/**
 * Получить список валют.
 * @param numberCurrency Количество валют в списке.
 * @param currency Валюты, с которыми сделать пары.
 */
const getCurrencyList = (numberCurrency: number, currencies: CurrencyIso[]) => async (
    dispatch: Dispatch<CurrencyAction>,
) => {
    try {
        dispatch({
            type: CurrencyActionTypes.FETCH_PENDING,
            payload: true,
        });

        const currencyList = await CurrencyService.getCurrencyList(numberCurrency, currencies);
        dispatch({type: CurrencyActionTypes.FETCH_SUCCESS, payload: currencyList});
    } catch (e) {
        dispatch({type: CurrencyActionTypes.FETCH_ERROR, payload: e.message});
    }
};

export default getCurrencyList;
