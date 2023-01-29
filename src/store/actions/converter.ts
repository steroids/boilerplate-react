import {Dispatch} from 'react';
import {ConverterActionTypes, ConverterFormAction} from 'store/types/converter';

interface IFormState {
    formId: string;
    inputValue: string;
    currencyId: number;
}

/**
 * Обновить форму конвертации валют.
 * @param inputValue Значение внутри инпута.
 * @param currencyId Текущий id валюты.
 */
const updateForm = (formState: Partial<IFormState>) => (dispatch: Dispatch<ConverterFormAction>) => {
    const input = formState.inputValue;
    if (formState.formId === 'formOne') {
        dispatch({
            type: ConverterActionTypes.SET_FORM_ONE,
            payload: {input, select: formState.currencyId},
        });
    }
    if (formState.formId === 'formTwo') {
        dispatch({
            type: ConverterActionTypes.SET_FORM_TWO,
            payload: {input, select: formState.currencyId},
        });
    }
};

export default updateForm;
