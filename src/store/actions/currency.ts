import {CurrencyService} from 'api/service';
import {Dispatch} from 'react';
import {ListQueryParams, Currency} from 'core/models';
import {ActionsUnion, createAction} from '.';

export enum CurrencyActionTypes {
    FETCH_PENDING = 'FETCH_CURRENCY_PENDING',
    FETCH_SUCCESS = 'FETCH_CURRENCY_SUCCESS',
    FETCH_ERROR = 'FETCH_CURRENCY_ERROR',
}

export const Actions = {
    fetchPendingCurrency: (isLoading: boolean) => createAction(CurrencyActionTypes.FETCH_PENDING, isLoading),
    fetchRejectAction: (error: string) => createAction(CurrencyActionTypes.FETCH_ERROR, error),
    fetchSuccessAction: (currencyList: Currency[]) => createAction(CurrencyActionTypes.FETCH_SUCCESS, currencyList),
};

export type CurrencyAction = ActionsUnion<typeof Actions>;

/**
 * Получить список валют.
 * @param listQueryParams Параметры для получения списка валют.
 */
const getCurrencyList = (listQueryParams: ListQueryParams) => async (dispatch: Dispatch<CurrencyAction>) => {
    try {
        dispatch(Actions.fetchPendingCurrency(true));
        const currencyList = await CurrencyService.getCurrencyList(listQueryParams);
        dispatch(Actions.fetchSuccessAction(currencyList));
    } catch (e) {
        dispatch(Actions.fetchRejectAction(e.message));
    }
};

export default getCurrencyList;
