import {Currency} from 'core/models';

export enum CurrencyActionTypes {
    FETCH_PENDING = 'FETCH_CURRENCY_PENDING',
    FETCH_SUCCESS = 'FETCH_CURRENCY_SUCCESS',
    FETCH_ERROR = 'FETCH_CURRENCY_ERROR',
}

export interface FetchPendingAction {
    type: CurrencyActionTypes.FETCH_PENDING;
    payload: boolean;
}
interface FetchRejectAction {
    type: CurrencyActionTypes.FETCH_ERROR;
    payload: string;
}
interface FetchSuccessAction {
    type: CurrencyActionTypes.FETCH_SUCCESS;
    payload: Currency[];
}

/** Экшены для валюты. */
export type CurrencyAction = FetchRejectAction | FetchPendingAction | FetchSuccessAction;
