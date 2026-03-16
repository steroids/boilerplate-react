import {IUserSchema} from '../user/users';
import {createMethod, ISearchDto, ISearchSchema} from '../utils';

export interface IProjectMemberSearchDto {
    query?: string,
}

export interface IProjectMemberSchema {
    id: number,
    title: string,
    user: IUserSchema,
    isActive: boolean,
}

export interface IProjectMemberInviteDto {
    projectId: number,
    email: string,
}

export interface IProjectMemberBlockDto {
    projectId: number,
    userId: number,
}

/**
 * Участники проекта
 */
export const apiProjectMembers = {
    /**
     * Поиск участников
     */
    search: createMethod<ISearchDto<IProjectMemberSearchDto>, ISearchSchema<IProjectMemberSchema>>({
        method: 'get',
        urlBuilder: () => '/api/v1/project/members',
    }),

    /**
     * Отправка приглашения
     */
    invite: createMethod<IProjectMemberInviteDto, null>({
        method: 'post',
        urlBuilder: () => '/api/v1/project/members/invite',
    }),

    /**
     * Заблокировать участника
     */
    block: createMethod<IProjectMemberBlockDto, null>({
        method: 'post',
        urlBuilder: () => '/api/v1/project/members/block',
    }),

    /**
     * Разблокировать участника
     */
    unblock: createMethod<IProjectMemberBlockDto, null>({
        method: 'post',
        urlBuilder: () => '/api/v1/project/members/unblock',
    }),
};
