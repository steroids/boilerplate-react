import {createMethod, ISearchDto, ISearchSchema} from '../utils';

export interface IRoleSearchDto {
    query?: string,
}

export interface IRoleSchema {
    id: number,
    name: string,
    title: string,
    description: string,
    isActive: boolean,
    expireTime: string,
    parentId: number,
}

export interface IRoleDetailSchema {
    id: number,
    name: string,
    title: string,
    description: string,
    isActive: boolean,
    expireTime: string,
    parentId: number,
    permissionKeys: string[],
}

export interface IRoleSaveDto {
    name: string,
    title: string,
    description: string,
    isActive: boolean,
    expireTime: string,
    parentId: number,
    permissionKeys: string[],
}

/**
 * Роли
 */
export const apiRoles = {
    /**
     * Поиск ролей
     */
    search: createMethod<ISearchDto<IRoleSearchDto>, ISearchSchema<IRoleSchema>>({
        method: 'get',
        urlBuilder: () => '/api/v1/auth/role', // TODO
    }),

    /**
     * Получение роли
     */
    getById: createMethod<null, IRoleDetailSchema>({
        method: 'get',
        urlBuilder: ({roleId}) => `/api/v1/auth/role/${roleId}`, // TODO
    }),

    /**
     * Создание роли
     */
    create: createMethod<IRoleSaveDto, IRoleDetailSchema>({
        method: 'post',
        urlBuilder: () => '/api/v1/auth/role', // TODO
    }),

    /**
     * Обновление роли
     */
    update: createMethod<IRoleSaveDto, IRoleDetailSchema>({
        method: 'put',
        urlBuilder: ({roleId}) => `/api/v1/role/role/${roleId}`, // TODO
    }),

    /**
     * Удаление роли
     */
    delete: createMethod<IRoleSearchDto, null>({
        method: 'delete',
        urlBuilder: ({roleId}) => `/api/v1/role/role/${roleId}`, // TODO
    }),
};
