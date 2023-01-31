import {CONVERSION_FORM_ONE, CONVERSION_FORM_TWO} from 'core/constants/currencyList';
import {Currency, ExchangeRates} from 'core/models';
import {Dispatch} from 'react';
import _ from 'lodash';
import {RootState} from 'store/reducers';
import {StorageService} from 'api/service';
import {ActionsUnion, createAction} from '.';

const ERROR_MESSAGE = 'Данные валютных пар не загружены. Конвертация невозможна.';

export interface IFormState {
    inputValue: number;
    currencyRates: Partial<ExchangeRates>;
    selectId: number;
}

export enum ConverterActionTypes {
    SET_FORM_ONE = 'SET_FORM_ONE',
    SET_FORM_TWO = 'SET_FORM_TWO',
    SET_ERROR_FORM = 'SET_FORM_ERROR',
}

export const Actions = {
    setFormOne: (state: Partial<IFormState>) => createAction(ConverterActionTypes.SET_FORM_ONE, state),
    setFormTwo: (state: Partial<IFormState>) => createAction(ConverterActionTypes.SET_FORM_TWO, state),
    setFormError: (error: string) => createAction(ConverterActionTypes.SET_ERROR_FORM, error),
};

export type ConverterAction = ActionsUnion<typeof Actions>;

/**
 * Получить текущее состояние селекта.
 * @param name Имя формы.
 * @param state Состояние.
 */
const getStateSelect = (name: string, state: RootState) => {
    if (name === CONVERSION_FORM_ONE) {
        return state.converter.formOne?.currencyRates;
    }
    if (name === CONVERSION_FORM_TWO) {
        return state.converter.formTwo?.currencyRates;
    }
    return undefined;
};

/**
 * Получить текущее состояние инпута.
 * @param name Имя формы.
 * @param state Состояние.
 */
const getStateInput = (name: string, state: RootState) => {
    if (name === CONVERSION_FORM_ONE) {
        return state.converter.formOne?.inputValue;
    }
    if (name === CONVERSION_FORM_TWO) {
        return state.converter.formTwo?.inputValue;
    }
    return undefined;
};

/**
 * Изменить количество валюты в форме конвертации.
 * @param formName Имя формы, в которой происходит изменение валюты.
 * @param amountOfCurrency Количество валюты.
 * @param oppositeFormName Имя противоположной формы.
 */
export const changeInput = (formName: string, amountOfCurrency: number, oppositeFormName: string) => (
    dispatch: Dispatch<ConverterAction>,
    getState: () => RootState,
) => {
    const state = getState();
    const selectForm = getStateSelect(formName, state);
    const selectOppositeForm = getStateSelect(oppositeFormName, state);
    if (!_.isEmpty(selectForm) || !_.isEmpty(selectOppositeForm)) {
        const result = _.toNumber(((selectForm.USD / selectOppositeForm.USD) * amountOfCurrency).toFixed(4));
        if (formName === CONVERSION_FORM_ONE) {
            dispatch(Actions.setFormOne({inputValue: amountOfCurrency}));
            dispatch(Actions.setFormTwo({inputValue: result}));
        }
        if (formName === CONVERSION_FORM_TWO) {
            dispatch(Actions.setFormTwo({inputValue: amountOfCurrency}));
            dispatch(Actions.setFormOne({inputValue: result}));
        }
    }
};

/**
 * Изменить валюту в форме конвертации.
 * @param formName Имя формы.
 * @param currency Валюта.
 */
export const changeSelect = (formName: string, currency: Currency, oppositeFormName: string) => (
    dispatch: Dispatch<ConverterAction>,
    getState: () => RootState,
) => {
    const state = getState();
    const inputForm = getStateInput(formName, state);
    const inputOppositeForm = getStateInput(oppositeFormName, state);

    StorageService.save(formName, currency?.id);

    if (!_.isEmpty(currency?.rates)) {
        if (formName === CONVERSION_FORM_ONE) {
            dispatch(Actions.setFormOne({inputValue: inputForm, currencyRates: currency?.rates}));
            dispatch(Actions.setFormTwo({inputValue: inputOppositeForm}));
        }
        if (formName === CONVERSION_FORM_TWO) {
            dispatch(Actions.setFormTwo({inputValue: inputOppositeForm, currencyRates: currency?.rates}));
        }
    }
    if (_.isEmpty(currency?.rates)) {
        dispatch(Actions.setFormError(ERROR_MESSAGE));
    }
};
