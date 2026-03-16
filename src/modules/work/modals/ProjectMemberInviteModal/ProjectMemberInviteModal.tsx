import {listFetch} from '@steroidsjs/core/actions/list';
import {useBem} from '@steroidsjs/core/hooks';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import {Button, Form, InputField} from '@steroidsjs/core/ui/form';
import Modal from '@steroidsjs/core/ui/modal/Modal';
import {IModalViewProps} from '@steroidsjs/core/ui/modal/Modal/Modal';
import * as React from 'react';
import {useCallback, useMemo} from 'react';

import {apiProjectMembers, IProjectMemberInviteDto} from 'api/project/members';

import {PROJECT_MEMBERS_PAGE_GRID_ID} from '../../routes/ProjectMembersPage/ProjectMembersPage';

import './ProjectMemberInviteModal.scss';

interface IEditProjectModalProps {
    projectId: number,
}

const PROJECT_MEMBER_INVITE_FORM_ID = 'ProjectMemberInviteModal_Form';

export default function ProjectMemberInviteModal(props: IModalViewProps & IEditProjectModalProps) {
    const bem = useBem('ProjectMemberInviteModal');
    const dispatch = useDispatch();

    const onComplete = useCallback(
        () => {
            dispatch(listFetch(PROJECT_MEMBERS_PAGE_GRID_ID));
            props.onClose.call(null);
        },
        [dispatch, props.onClose],
    );

    const initialValues = useMemo(
        () => ({
            isActive: true,
            projectId: Number(props.projectId),
        }),
        [props.projectId],
    );

    return (
        <Modal
            {...props}
            onClose={props.onClose}
            title={__('Приглашение пользователя')}
        >
            <Form
                formId={PROJECT_MEMBER_INVITE_FORM_ID}
                className={bem.block()}
                actionMethod={apiProjectMembers.invite.method}
                action={apiProjectMembers.invite.urlBuilder()}
                initialValues={initialValues}
                onComplete={onComplete}
            >
                <InputField
                    attribute={'email' satisfies keyof IProjectMemberInviteDto}
                    label={__('Электронная почта')}
                />
                <Button
                    type='submit'
                    label={__('Отправить приглашение')}
                />
            </Form>
        </Modal>
    );
}
