import {createMethod, ISearchDto, ISearchSchema} from '../utils';

export interface IUserSearchDto {
    query?: string,
}

export interface IUserSchema {
    id: number,
    name: string,
    email: string,
    createTime: string,
}

export interface IUserDetailSchema {
    id: number,
    name: string,
    email: string,
    about: string,
}

export interface IUserSaveDto {
    name: string,
    email: string,
    about: string,
}

/**
 * Пользователи
 */
export const apiUsers = {
    /**
     * Поиск пользователей
     */
    search: createMethod<ISearchDto<IUserSearchDto>, ISearchSchema<IUserSchema>>({
        method: 'get',
        urlBuilder: () => '/api/v1/user/users',
    }),

    /**
     * Получение пользователя
     */
    getById: createMethod<null, IUserDetailSchema>({
        method: 'get',
        urlBuilder: ({userId}) => `/api/v1/user/users/${userId}`,
    }),

    /**
     * Создание пользователя
     */
    create: createMethod<IUserSaveDto, IUserDetailSchema>({
        method: 'post',
        urlBuilder: () => '/api/v1/user/users',
    }),

    /**
     * Обновление пользователя
     */
    update: createMethod<IUserSaveDto, IUserDetailSchema>({
        method: 'put',
        urlBuilder: ({userId}) => `/api/v1/user/users/${userId}`,
    }),

    /**
     * Удаление пользователя
     */
    delete: createMethod<IUserSearchDto, null>({
        method: 'delete',
        urlBuilder: ({userId}) => `/api/v1/user/users/${userId}`,
    }),
};
