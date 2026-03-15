export interface IApiMethod {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    urlBuilder: ((params?: Record<string, string | number>) => string),
}

export type IApiData = Record<string, any>;

export type ISearchDto<T> = T & {
    page: number,
    pageSize: number,
}

export interface ISearchSchema<T> {
    total: number,
    meta: Record<string, any>,
    items: Array<T>,
}

export const createMethod = <
    IRequest extends IApiData,
    IResponse extends IApiData
>(config: IApiMethod) => config;
