import {listFetch} from '@steroidsjs/core/actions/list';
import {useBem, useComponents, useDispatch, useSelector} from '@steroidsjs/core/hooks';
import {getUser} from '@steroidsjs/core/reducers/auth';
import {Button, CheckboxField, Form, InputField} from '@steroidsjs/core/ui/form';
import Grid from '@steroidsjs/core/ui/list/Grid';
import {Link} from '@steroidsjs/core/ui/nav';
import React from 'react';

import {apiProjects, IProjectSchema, IProjectSearchDto} from 'api/project/projects';
import LayoutContent from 'shared/LayoutContent';
import LayoutTitle from 'shared/LayoutTitle';

import {PERMISSION_PROJECT_PROJECT_EDIT} from '../../constants/permissions';
import {ROUTE_WORK_PROJECTS_CREATE, ROUTE_WORK_PROJECTS_VIEW_GENERAL} from '../../constants/routes';
import ProjectStatusEnum from '../../enums/ProjectStatusEnum';

import './ProjectsPage.scss';

const PROJECTS_PAGE_GRID_ID = 'ProjectsPage_Grid';
const PROJECTS_PAGE_GRID_COLUMNS = [
    {
        label: __('ИД'),
        attribute: 'id' satisfies keyof IProjectSchema,
    },
    {
        label: __('Название проекта'),
        attribute: 'name' satisfies keyof IProjectSchema,
        valueView: ({item}: {item: IProjectSchema}) => (
            <Link
                label={item.name}
                toRoute={ROUTE_WORK_PROJECTS_VIEW_GENERAL}
                toRouteParams={{
                    projectId: item.id,
                }}
            />
        ),
    },
    {
        label: __('Участников'),
        valueView: ({item}: {item: IProjectSchema}) => item.membersCount,
    },
    {
        label: __('Статус проекта'),
        valueView: ({item}: {item: IProjectSchema}) => ProjectStatusEnum.getLabel(item.isArchived),
    },
];

export default function ProjectsPage() {
    const bem = useBem('ProjectsPage');
    const {http} = useComponents();
    const dispatch = useDispatch();
    const user = useSelector(state => getUser(state));

    return (
        <div className={bem.block()}>
            <LayoutTitle>
                {user?.roles?.includes(PERMISSION_PROJECT_PROJECT_EDIT) && (
                    <Button
                        label={__('Добавить проект')}
                        toRoute={ROUTE_WORK_PROJECTS_CREATE}
                        tag='a'
                        icon='create'
                    />
                )}
            </LayoutTitle>
            <LayoutContent>
                <Form
                    useRedux
                    formId={PROJECTS_PAGE_GRID_ID}
                >
                    <div className='row gap-3'>
                        <div className='col-4'>
                            <InputField
                                attribute={'query' satisfies keyof IProjectSearchDto}
                                placeholder={__('Название проекта')}
                            />
                        </div>
                        <div className={bem(bem.element('form-checkbox'), 'col-4')}>
                            <CheckboxField
                                attribute={'isShowOur' satisfies keyof IProjectSearchDto}
                                label={__('Показать внутренние')}
                            />
                            <CheckboxField
                                attribute={'isShowArchived' satisfies keyof IProjectSearchDto}
                                label={__('Показать архивные')}
                            />
                        </div>
                    </div>
                </Form>
                <Grid
                    listId={PROJECTS_PAGE_GRID_ID}
                    searchForm={{
                        formId: PROJECTS_PAGE_GRID_ID,
                    }}
                    actionMethod={apiProjects.search.method}
                    action={apiProjects.search.urlBuilder()}
                    columns={PROJECTS_PAGE_GRID_COLUMNS}
                    controls={item => [
                        {
                            id: 'delete',
                            icon: 'delete',
                            label: null,
                            outline: false,
                            confirm: __('Удалить проект?'),
                            visible: user?.roles?.includes(PERMISSION_PROJECT_PROJECT_EDIT),
                            onClick: async () => {
                                await http.send(
                                    apiProjects.delete.method,
                                    apiProjects.delete.urlBuilder({
                                        projectId: item.id,
                                    }),
                                );

                                dispatch(listFetch(PROJECTS_PAGE_GRID_ID));
                            },
                        },
                    ]}
                />
            </LayoutContent>
        </div>
    );
}
