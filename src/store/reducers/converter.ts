import {StorageService} from 'api/service';
import {CONVERSION_FORM_ONE, CONVERSION_FORM_TWO} from 'core/constants/currencyList';

import {ConverterAction, ConverterActionTypes, IFormState} from 'store/actions/converter';
import {RootState} from '.';

const DEFAULT_SELECT_ID = 1;

/** Стейт формы конвертации. */
interface IConverterState {
    /** Ошибка, если данных для конвертации не существует. */
    readonly error: string;

    /** Состояние первой формы. */
    readonly formOne: IFormState;

    /** Состояние второй */
    readonly formTwo: IFormState;
}

const initialState: IConverterState = {
    error: '',
    formOne: {
        inputValue: 0,
        currencyRates: undefined,
        selectId: StorageService.get<number>(CONVERSION_FORM_ONE) || DEFAULT_SELECT_ID,
    },
    formTwo: {
        inputValue: 0,
        currencyRates: undefined,
        selectId: StorageService.get<number>(CONVERSION_FORM_TWO) || DEFAULT_SELECT_ID,
    },
};

export const converterForm = (state = initialState, action: ConverterAction): IConverterState => {
    switch (action.type) {
        case ConverterActionTypes.SET_FORM_ONE: {
            return {
                ...state,
                error: '',
                formOne: {
                    selectId: action.payload.selectId || state.formOne.selectId,
                    inputValue: action.payload.inputValue,
                    currencyRates: action.payload.currencyRates || state.formOne.currencyRates,
                },
            };
        }
        case ConverterActionTypes.SET_FORM_TWO:
            return {
                ...state,
                error: '',
                formTwo: {
                    selectId: action.payload.selectId || state.formOne.selectId,
                    inputValue: action.payload.inputValue,
                    currencyRates: action.payload.currencyRates || state.formTwo.currencyRates,
                },
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

export const selectFormOne = (state: RootState) => state.converter.formOne;
export const selectFormTwo = (state: RootState) => state.converter.formTwo;
export const selectError = (state: RootState) => state.converter.error;
