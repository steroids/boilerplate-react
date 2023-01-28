import {CurrencyService} from 'api/service';
import {Dispatch} from 'react';
import {CurrencyAction, CurrencyActionTypes} from 'store/types/currency';
import {ListQueryParams} from 'core/models';

/**
 * Получить список валют.
 * @param listQueryParams Параметры для получения списка валют.
 */
const getCurrencyList = (listQueryParams: ListQueryParams) => async (dispatch: Dispatch<CurrencyAction>) => {
    try {
        dispatch({
            type: CurrencyActionTypes.FETCH_PENDING,
            payload: true,
        });

        const currencyList = await CurrencyService.getCurrencyList(listQueryParams);
        dispatch({type: CurrencyActionTypes.FETCH_SUCCESS, payload: currencyList});
    } catch (e) {
        dispatch({type: CurrencyActionTypes.FETCH_ERROR, payload: e.message});
    }
};

export default getCurrencyList;
