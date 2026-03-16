import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';

import ProjectCreatePage from './ProjectCreatePage';
import ProjectFormPage from './ProjectFormPage';
import ProjectGeneralPage from './ProjectGeneralPage';
import ProjectMembersPage from './ProjectMembersPage';
import ProjectWrapper from './ProjectWrapper';
import ProjectsPage from './ProjectsPage';
import {
    PERMISSION_PROJECT_PROJECT_EDIT,
    PERMISSION_PROJECT_PROJECT_VIEW,
} from '../constants/permissions';
import {
    ROUTE_WORK,
    ROUTE_WORK_PROJECTS_VIEW,
    ROUTE_WORK_PROJECTS_CREATE, ROUTE_WORK_PROJECTS_UPDATE,
    ROUTE_WORK_PROJECTS_VIEW_GENERAL, ROUTE_WORK_PROJECTS_VIEW_MEMBERS,
    ROUTE_WORK_PROJECTS,
} from '../constants/routes';

export default {
    [ROUTE_WORK]: {
        label: __('Работа'),
        path: 'work',
        exact: true,
        redirectTo: true,
        isNavVisible: true,
        items: {
            [ROUTE_WORK_PROJECTS]: {
                label: __('Проекты'),
                path: 'projects',
                exact: true,
                component: ProjectsPage,
                isNavVisible: true,
                roles: [PERMISSION_PROJECT_PROJECT_VIEW],
                items: {
                    [ROUTE_WORK_PROJECTS_CREATE]: {
                        label: __('Добавление проекта'),
                        exact: true,
                        path: 'create',
                        component: ProjectCreatePage,
                        roles: [PERMISSION_PROJECT_PROJECT_EDIT],
                    },
                    [ROUTE_WORK_PROJECTS_VIEW]: {
                        label: __('Проект'),
                        path: ':projectId',
                        redirectTo: true,
                        component: ProjectWrapper,
                        roles: [PERMISSION_PROJECT_PROJECT_VIEW],
                        items: {
                            [ROUTE_WORK_PROJECTS_VIEW_GENERAL]: {
                                label: __('Информация'),
                                exact: true,
                                path: 'general',
                                component: ProjectGeneralPage,
                                roles: [PERMISSION_PROJECT_PROJECT_VIEW],
                                items: {
                                    [ROUTE_WORK_PROJECTS_UPDATE]: {
                                        label: __('Редактирование проекта'),
                                        exact: true,
                                        path: 'update',
                                        component: ProjectFormPage,
                                        roles: [PERMISSION_PROJECT_PROJECT_EDIT],
                                    },
                                },
                            },
                            [ROUTE_WORK_PROJECTS_VIEW_MEMBERS]: {
                                label: __('Участники'),
                                exact: true,
                                path: 'members',
                                component: ProjectMembersPage,
                                roles: [PERMISSION_PROJECT_PROJECT_VIEW],
                            },
                        },
                    },
                },
            },
        },
    } as IRouteItem,
};
