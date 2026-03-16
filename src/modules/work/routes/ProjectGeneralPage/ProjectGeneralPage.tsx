import {useBem, useFetch, useSelector} from '@steroidsjs/core/hooks';
import {getUser} from '@steroidsjs/core/reducers/auth';
import {getRouteParam} from '@steroidsjs/core/reducers/router';
import {Detail, DetailItem} from '@steroidsjs/core/ui/content';
import {Button} from '@steroidsjs/core/ui/form';
import {Loader} from '@steroidsjs/core/ui/layout';
import React, {useMemo} from 'react';

import {apiProjects, IProjectDetailSchema} from 'api/project/projects';

import {PERMISSION_PROJECT_PROJECT_EDIT} from '../../constants/permissions';
import {ROUTE_WORK_PROJECTS_UPDATE} from '../../constants/routes';
import ProjectStatusEnum from '../../enums/ProjectStatusEnum';

import './ProjectGeneralPage.scss';

export default function ProjectGeneralPage() {
    const bem = useBem('ProjectGeneralPage');

    const user = useSelector(state => getUser(state));
    const projectId = useSelector(state => getRouteParam(state, 'projectId'));

    const {data: project, isLoading} = useFetch(
        useMemo(
            () => ({
                method: apiProjects.getById.method,
                url: apiProjects.getById.urlBuilder({
                    projectId,
                }),
            }),
            [projectId],
        ),
    ) as {data: IProjectDetailSchema, isLoading: boolean};

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <div className={bem.block()}>
            <h2 className='mb-2'>
                Общая информация
            </h2>
            <div className='row mb-3'>
                <div className='col-4'>
                    <Detail
                        column={1}
                    >
                        <DetailItem label={__('ИД')}>
                            {project.id}
                        </DetailItem>
                        <DetailItem label={__('Название')}>
                            {project.title}
                        </DetailItem>
                        <DetailItem label={__('Описание')}>
                            {project.description}
                        </DetailItem>
                        <DetailItem label={__('Создатель')}>
                            {project.managerUser?.name}
                        </DetailItem>
                        <DetailItem label={__('Статус проекта')}>
                            {ProjectStatusEnum.getLabel(project.isArchived)}
                        </DetailItem>
                    </Detail>
                </div>
            </div>
            <div className={bem.element('edit-button')}>
                {user?.roles?.includes(PERMISSION_PROJECT_PROJECT_EDIT) && (
                    <Button
                        label={__('Редактировать')}
                        toRoute={ROUTE_WORK_PROJECTS_UPDATE}
                        toRouteParams={{
                            projectId: project.id,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
