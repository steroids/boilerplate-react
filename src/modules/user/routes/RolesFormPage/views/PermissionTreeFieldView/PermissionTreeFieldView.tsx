import {useUniqueId} from '@steroidsjs/core/hooks';
import useBem from '@steroidsjs/core/hooks/useBem';
import {ICheckboxTreeFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxTreeField/CheckboxTreeField';
import {ITreeItemViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import React from 'react';

import './PermissionTreeFieldView.scss';

interface IPermissionTreeFieldViewProps extends ICheckboxTreeFieldViewProps {
    itemView: React.FunctionComponent<ITreeItemViewProps>,
}

export default function PermissionTreeFieldView(props: IPermissionTreeFieldViewProps) {
    const bem = useBem('PermissionTreeFieldView');
    const TreeFieldItemView = props.itemView;
    const prefix = useUniqueId('checkbox');

    return (
        <table className={bem.block()}>
            <tbody>
                {props.items.map((checkbox) => {
                    const isChecked = props.selectedIds.includes(checkbox.id);

                    return (
                        <TreeFieldItemView
                            key={checkbox.uniqueId}
                            item={checkbox}
                            levelPadding={props.levelPadding}
                            hasIconExpandOnly={props.hasIconExpandOnly}
                            selectedIds={props.selectedIds}
                            isChecked={isChecked}
                        >
                            {props.renderCheckbox({
                                id: `${prefix}_${checkbox.id}`,
                                inputProps: {
                                    name: `${prefix}_${checkbox.id}`,
                                    type: 'checkbox',
                                    checked: isChecked,
                                    onChange: () => {
                                        props.onItemSelect(checkbox);
                                    },
                                    disabled: checkbox.disabled,
                                    required: checkbox.required,
                                },
                                size: props.size,
                                color: checkbox.color,
                                hasOnlyLeafCheckboxes: props.hasOnlyLeafCheckboxes,
                            }) }
                        </TreeFieldItemView>
                    );
                })}
            </tbody>
        </table>
    );
}
