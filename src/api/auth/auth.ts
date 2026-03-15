import {createMethod} from '../utils';

export interface IAuthLoginDto {
    login: string,
    password: string,
}

/**
 * Авторизация
 */
export const apiAuth = {
    login: createMethod<IAuthLoginDto, null>({
        method: 'post',
        urlBuilder: () => '/api/v1/auth/login',
    }),
};
