import {useBem, useFetch} from '@steroidsjs/core/hooks';
import React, {useMemo} from 'react';

import {
    apiProjects,
    IProjectDashboardSchema,
} from 'api/project/projects';
import LayoutContent from 'shared/LayoutContent';
import LayoutTitle from 'shared/LayoutTitle';

import './DashboardPage.scss';

export default function DashboardPage() {
    const bem = useBem('DashboardPage');

    const {data, isLoading} = useFetch(
        useMemo(
            () => ({
                method: apiProjects.getDashboard.method,
                url: apiProjects.getDashboard.urlBuilder(),
            }),
            [],
        ),
    ) as {data: IProjectDashboardSchema, isLoading: boolean};

    return (
        <div className={bem.block()}>
            <LayoutTitle />
            <LayoutContent>
                {JSON.stringify(data)}
            </LayoutContent>
        </div>
    );
}
