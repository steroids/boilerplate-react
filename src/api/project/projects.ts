import {IUserSchema} from '../user/users';
import {createMethod, ISearchDto, ISearchSchema} from '../utils';
import {IProjectMemberSchema} from './members';

export interface IProjectSearchDto {
    query?: string,
    isShowOur?: boolean,
    isShowArchived?: boolean,
}

export interface IProjectSchema {
    id: number,
    name: string,
    membersCount: number,
    isArchived: boolean,
}

export interface IProjectDetailSchema {
    id: number,
    title: string,
    description: string,
    managerUserId: number,
    managerUser?: IUserSchema | null,
    isArchived?: boolean,
}

export interface IProjectDashboardSchema {
    topProjects: IProjectSchema[],
    topMembers: IProjectMemberSchema[],
}

export interface IProjectSaveDto {
    title: string,
    description: string,
    managerUserId: string,
    isArchived?: boolean,
}

/**
 * Проекты
 */
export const apiProjects = {
    /**
     * Поиск проектов
     */
    search: createMethod<ISearchDto<IProjectSearchDto>, ISearchSchema<IProjectSchema>>({
        method: 'get',
        urlBuilder: () => '/api/v1/project/projects',
    }),

    /**
     * Получение проекта
     */
    getById: createMethod<null, IProjectDetailSchema>({
        method: 'get',
        urlBuilder: ({projectId}) => `/api/v1/project/projects/${projectId}`,
    }),

    /**
     * Получение данных для дашборда
     */
    getDashboard: createMethod<null, IProjectDashboardSchema>({
        method: 'get',
        urlBuilder: () => '/api/v1/project/dashboard',
    }),

    /**
     * Создание проекта
     */
    create: createMethod<IProjectSaveDto, IProjectDetailSchema>({
        method: 'post',
        urlBuilder: () => '/api/v1/project/projects',
    }),

    /**
     * Обновление проекта
     */
    update: createMethod<IProjectSaveDto, IProjectDetailSchema>({
        method: 'put',
        urlBuilder: ({projectId}) => `/api/v1/project/projects/${projectId}`,
    }),

    /**
     * Удаление проекта
     */
    delete: createMethod<IProjectSearchDto, null>({
        method: 'delete',
        urlBuilder: ({projectId}) => `/api/v1/project/projects/${projectId}`,
    }),
};
