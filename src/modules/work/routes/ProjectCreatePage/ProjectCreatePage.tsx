import {useBem} from '@steroidsjs/core/hooks';
import React from 'react';

import LayoutContent from 'shared/LayoutContent';
import LayoutTitle from 'shared/LayoutTitle';

import ProjectFormPage from '../ProjectFormPage';

import './ProjectCreatePage.scss';

export function ProjectCreatePage() {
    const bem = useBem('ProjectPage');

    return (
        <div className={bem.block()}>
            <LayoutTitle />
            <LayoutContent>
                <ProjectFormPage />
            </LayoutContent>
        </div>
    );
}
