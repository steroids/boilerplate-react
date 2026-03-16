import {listFetch} from '@steroidsjs/core/actions/list';
import {openModal} from '@steroidsjs/core/actions/modal';
import {useBem, useComponents, useSelector} from '@steroidsjs/core/hooks';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import {getUser} from '@steroidsjs/core/reducers/auth';
import {Button, Form, InputField} from '@steroidsjs/core/ui/form';
import Grid from '@steroidsjs/core/ui/list/Grid';
import React, {useCallback} from 'react';

import {apiProjectMembers, IProjectMemberSchema, IProjectMemberSearchDto} from 'api/project/members';

import {PERMISSION_PROJECT_PROJECT_EDIT} from '../../constants/permissions';
import ProjectMemberInviteModal from '../../modals/ProjectMemberInviteModal';

import './ProjectMembersPage.scss';

interface IProjectMemverPage {
    match: {
        params: {
            projectId: number,
        },
    },
}

export const PROJECT_MEMBERS_PAGE_FORM_ID = 'ProjectMembersPage_Form';
export const PROJECT_MEMBERS_PAGE_GRID_ID = 'ProjectMembersPage_Grid';
export const PROJECT_MEMBERS_PAGE_GRID_COLUMNS = [
    {
        label: __('ИД'),
        attribute: 'id' satisfies keyof IProjectMemberSchema,
    },
    {
        label: __('Имя пользователя'),
        valueView: ({item}: {item: IProjectMemberSchema}) => item.user?.name,
    },
    {
        label: __('Email'),
        valueView: ({item}: {item: IProjectMemberSchema}) => item.user?.email ?? '',
    },
];

export default function ProjectMembersPage(props: IProjectMemverPage) {
    const bem = useBem('ProjectMembersPage');
    const projectId = props.match.params.projectId;
    const user = useSelector(state => getUser(state));

    const dispatch = useDispatch();
    const {http} = useComponents();

    const gridControls = useCallback(
        (item: IProjectMemberSchema) => ([
            {
                icon: item.isActive
                    ? 'x_close'
                    : 'add_plus',
                visible: user?.roles?.includes(PERMISSION_PROJECT_PROJECT_EDIT),
                confirm: __('Вы действительно хотите заблокировать участника?'),
                onClick: async () => {
                    const method = item.isActive
                        ? apiProjectMembers.block.method
                        : apiProjectMembers.unblock.method;

                    const url = item.isActive
                        ? apiProjectMembers.block.urlBuilder({
                            id: item.id,
                        })
                        : apiProjectMembers.unblock.urlBuilder({
                            id: item.id,
                        });

                    await http.send(method, url);

                    dispatch(listFetch(PROJECT_MEMBERS_PAGE_GRID_ID));
                },
            },
        ]),
        [dispatch, http, user?.roles],
    );

    return (
        <div className={bem.block()}>
            <h2 className='mb-3'>
                Общая информация
            </h2>
            <div className={bem.element('filters')}>
                <Form
                    formId={PROJECT_MEMBERS_PAGE_FORM_ID}
                    useRedux
                    className={bem.block('search-form')}
                >
                    <InputField
                        attribute={'query' satisfies keyof IProjectMemberSearchDto}
                        placeholder={__('Поиск по имени')}
                        inputProps={{
                            style: {
                                width: 400,
                            },
                        }}
                    />
                </Form>
                {user?.roles?.includes(PERMISSION_PROJECT_PROJECT_EDIT) && (
                    <Button
                        label={__('Пригласить пользователя')}
                        icon='user'
                        onClick={() => {
                            dispatch(openModal(ProjectMemberInviteModal, {
                                projectId,
                            }));
                        }}
                    />
                )}
            </div>
            <Grid
                listId={PROJECT_MEMBERS_PAGE_GRID_ID}
                searchForm={{
                    formId: PROJECT_MEMBERS_PAGE_FORM_ID,
                }}
                className={bem.block('grid')}
                action={apiProjectMembers.search.urlBuilder()}
                actionMethod={apiProjectMembers.search.method}
                query={{
                    projectId,
                }}
                columns={PROJECT_MEMBERS_PAGE_GRID_COLUMNS}
                controls={gridControls}
            />
        </div>
    );
}
