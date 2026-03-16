import {useBem, useFetch, useSelector} from '@steroidsjs/core/hooks';
import {getRouteParam} from '@steroidsjs/core/reducers/router';
import {Loader} from '@steroidsjs/core/ui/layout';
import React, {useMemo} from 'react';

import {apiProjects, IProjectDetailSchema} from 'api/project/projects';
import LayoutContent from 'shared/LayoutContent';
import LayoutTitle from 'shared/LayoutTitle';

import {ROUTE_WORK_PROJECTS_VIEW} from '../../constants/routes';

import './ProjectWrapper.scss';

export default function ProjectWrapper(props: React.PropsWithChildren<any>) {
    const bem = useBem('ProjectWrapper');

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
            <LayoutTitle
                title={project?.title}
            />
            <LayoutContent
                nav={ROUTE_WORK_PROJECTS_VIEW}
            >
                {props.children}
            </LayoutContent>
        </div>
    );
}
