export enum ConverterActionTypes {
    SET_FORM_ONE = 'SET_FORM_ONE',
    SET_FORM_TWO = 'SET_FORM_TWO',
}

export interface IFormState {
    input: string;
    select: number;
}

interface SetFormOne {
    type: ConverterActionTypes.SET_FORM_ONE;
    payload: Partial<IFormState>;
}
interface SetFormTwo {
    type: ConverterActionTypes.SET_FORM_TWO;
    payload: Partial<IFormState>;
}

/** Экшены для формы конвертации. */
export type ConverterFormAction = SetFormOne | SetFormTwo;
