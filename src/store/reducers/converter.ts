import {ConverterActionTypes, ConverterFormAction, IFormState} from 'store/types/converter';
import {RootState} from '.';

/** Стейт формы конвертации. */
interface ConverterState {
    readonly formOne: IFormState;
    readonly formTwo: IFormState;
}

const initialState: ConverterState = {
    formOne: {
        input: '',
        select: 1,
    },
    formTwo: {
        input: '',
        select: 1,
    },
};

export const converterForm = (state = initialState, action: ConverterFormAction): ConverterState => {
    switch (action.type) {
        case ConverterActionTypes.SET_FORM_ONE:
            return {
                ...state,
                formOne: {
                    input: action.payload.input,
                    select: action.payload.select || state.formOne.select,
                },
            };
        case ConverterActionTypes.SET_FORM_TWO:
            return {
                ...state,
                formTwo: {
                    input: action.payload.input || state.formTwo.input,
                    select: action.payload.select || state.formTwo.select,
                },
            };

        default:
            return state;
    }
};

export const selectorFormOne = (state: RootState) => state.converter.formOne;
export const selectorFormTwo = (state: RootState) => state.converter.formTwo;
