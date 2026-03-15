import {createMethod} from '../utils';

export interface IPermissionTreeSchema {
    id: string,
    label: string,
    items?: IPermissionTreeSchema[],
}

/**
 * Права
 */
export const apiPermissions = {
    /**
     * Получение дерева прав
     */
    getTree: createMethod<null, IPermissionTreeSchema>({
        method: 'get',
        urlBuilder: () => '/api/v1/auth/permission/tree',
    }),
};
