import {showNotification} from '@steroidsjs/core/actions/notifications';
import {goToRoute} from '@steroidsjs/core/actions/router';
import {useBem, useComponents, useDispatch, useFetch, useSelector} from '@steroidsjs/core/hooks';
import {getRouteParam} from '@steroidsjs/core/reducers/router';
import {CheckboxField, DropDownField, Form, InputField, TextField} from '@steroidsjs/core/ui/form';
import {Loader} from '@steroidsjs/core/ui/layout';
import React, {useMemo} from 'react';

import {apiProjects, IProjectDetailSchema, IProjectSaveDto, IProjectSchema} from 'api/project/projects';
import {apiUsers} from 'api/user/users';

import {ISearchSchema} from '../../../../api/utils';
import {ROUTE_WORK_PROJECTS_VIEW, ROUTE_WORK_PROJECTS} from '../../constants/routes';

const PROJECT_FORM_PAGE_FORM_ID = 'ProjectFormPage_Form';

export function ProjectFormPage() {
    const bem = useBem('ProjectFormPage');
    const {http} = useComponents();
    const dispatch = useDispatch();

    const projectId = useSelector(state => getRouteParam(state, 'projectId'));
    const isUpdate = !!projectId;

    const {data: project, isLoading} = useFetch(
        useMemo(
            () => projectId && ({
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
            {isUpdate && (
                <h2 className='mb-2'>
                    Редактирование проекта
                </h2>
            )}
            <div className='row'>
                <div className='col-4'>
                    <Form
                        formId={PROJECT_FORM_PAGE_FORM_ID}
                        submitLabel={__('Сохранить')}
                        actionMethod={
                            isUpdate
                                ? apiProjects.update.method
                                : apiProjects.create.method
                        }
                        action={
                            isUpdate
                                ? apiProjects.update.urlBuilder({
                                    projectId,
                                })
                                : apiProjects.create.urlBuilder()
                        }
                        initialValues={project}
                        onComplete={() => {
                            if (isUpdate) {
                                dispatch(goToRoute(ROUTE_WORK_PROJECTS_VIEW, {
                                    projectId,
                                }));
                                dispatch(showNotification(__('Проект изменен')));
                            } else {
                                dispatch(goToRoute(ROUTE_WORK_PROJECTS));
                                dispatch(showNotification(__('Проект сохранен')));
                            }
                        }}
                    >
                        <InputField
                            attribute={'title' satisfies keyof IProjectSaveDto}
                            label={__('Название')}
                        />
                        <TextField
                            attribute={'description' satisfies keyof IProjectSaveDto}
                            label={__('Описание')}
                        />
                        <DropDownField
                            attribute={'managerUserId' satisfies keyof IProjectSaveDto}
                            label={__('Ответственный')}
                            dataProvider={{
                                action: apiUsers.search.urlBuilder(),
                                actionMethod: apiUsers.search.method,
                                onSearch: async (url: string, params) => {
                                    const response: {data?: ISearchSchema<IProjectSchema>} = await http
                                        .send(apiUsers.search.method, url, {
                                            query: params.query,
                                        });
                                    return response?.data?.items.map(item => ({
                                        id: item.id,
                                        label: item.name,
                                    }));
                                },
                            }}
                            showReset
                            showRemove
                            autoComplete
                        />
                        <CheckboxField
                            attribute={'isArchived' satisfies keyof IProjectSaveDto}
                            label={__('В архиве')}
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
}
