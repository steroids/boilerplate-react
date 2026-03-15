import {useBem} from '@steroidsjs/core/hooks';
import {CheckboxTreeField} from '@steroidsjs/core/ui/form';
import {Title} from '@steroidsjs/core/ui/typography';
import React from 'react';

import {IPermissionTreeSchema} from 'api/auth/permissions';

import PermissionTreeFieldItemView from '../PermissionTreeFieldItemView';
import PermissionTreeFieldView from '../PermissionTreeFieldView';

import './PermissionsTreeField.scss';

interface IPermissionsTreeFieldProps {
    attribute: string,
    permissionsTree: IPermissionTreeSchema,
}

export default function PermissionsTreeField(props: IPermissionsTreeFieldProps) {
    const bem = useBem('PermissionsTreeField');

    return (
        <div className={bem.block()}>
            <Title
                content={__('Список прав')}
                type='h3'
            />
            <CheckboxTreeField
                attribute={props.attribute}
                items={props.permissionsTree as any}
                view={PermissionTreeFieldView}
                itemView={PermissionTreeFieldItemView}
                levelPadding={32}
                hasIconExpandOnly={false}
            />
        </div>
    );
}
