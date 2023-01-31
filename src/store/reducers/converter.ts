import {StorageService} from 'api/service/storageService';

import {ConverterAction, ConverterActionTypes, IFormState} from 'store/actions/converter';
import {RootState} from '.';

/** Стейт формы конвертации. */
interface ConverterState {
    /** Ошибка, если данных для конвертации не существует. */
    readonly error: string;

    /** Состояние первой формы. */
    readonly formOne: IFormState;

    /** Состояние второй */
    readonly formTwo: IFormState;
}

const initialState: ConverterState = {
    error: '',
    formOne: {
        inputValue: 0,
        currencyRates: undefined,
        selectId: StorageService.get<number>('formOne'),
    },
    formTwo: {
        inputValue: 0,
        currencyRates: undefined,
        selectId: StorageService.get<number>('formTwo'),
    },
};

export const converterForm = (state = initialState, action: ConverterAction): ConverterState => {
    switch (action.type) {
        case ConverterActionTypes.SET_FORM_ONE: {
            return {
                ...state,
                formOne: {
                    selectId: action.payload.selectId || state.formOne.selectId,
                    inputValue: action.payload.inputValue,
                    currencyRates: action.payload.currencyRates || state.formOne.currencyRates,
                },
                error: '',
            };
        }
        case ConverterActionTypes.SET_FORM_TWO:
            return {
                ...state,
                formTwo: {
                    selectId: action.payload.selectId || state.formOne.selectId,
                    inputValue: action.payload.inputValue,
                    currencyRates: action.payload.currencyRates || state.formTwo.currencyRates,
                },
                error: '',
            };
        case ConverterActionTypes.SET_ERROR_FORM:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const selectorFormOne = (state: RootState) => state.converter.formOne;
export const selectorFormTwo = (state: RootState) => state.converter.formTwo;
export const selectorError = (state: RootState) => state.converter.error;
