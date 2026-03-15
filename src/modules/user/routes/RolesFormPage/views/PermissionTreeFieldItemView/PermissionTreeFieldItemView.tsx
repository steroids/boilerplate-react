import useBem from '@steroidsjs/core/hooks/useBem';
import {Icon} from '@steroidsjs/core/ui/content';
import {ITreeItemViewProps} from '@steroidsjs/core/ui/nav/Tree/Tree';
import {Text} from '@steroidsjs/core/ui/typography';
import React, {useCallback, useMemo} from 'react';

import {
    isAllOrSomeNestedItemsChecked,
    isRootCheckedButNotAll,
    isSomeCheckedButNotRoot,
} from '../../utils/isAllOrSomeNestedItemsChecked';

import './PermissionTreeFieldItemView.scss';

interface IPermissionTreeFieldItemViewProps extends ITreeItemViewProps {
    selectedIds: string[],
    isChecked?: boolean,
}

const PADDING_WITH_ICON = 0;
const PADDING_WITHOUT_ICON = 32;

export default function PermissionTreeFieldItemView(props: IPermissionTreeFieldItemViewProps) {
    const bem = useBem('PermissionTreeFieldItemView');

    const paddingBasedOnIcon = props.item.hasItems
        ? PADDING_WITH_ICON
        : PADDING_WITHOUT_ICON;

    const isFirstLevelWithItems = useMemo(
        () => props.item.level === 0 && props.item.hasItems,
        [props.item.hasItems, props.item.level],
    );

    const {isAllChecked, isSomeChecked} = useMemo(
        () => isFirstLevelWithItems && isAllOrSomeNestedItemsChecked(props.item, props.selectedIds),
        [isFirstLevelWithItems, props.item, props.selectedIds],
    );

    const renderIcon = useCallback(
        () => {
            // Если выбран хотя бы один вложенный элемент и не выбран корневой
            // или если не выбран ни один вложенный элемент, но выбран корневой
            const shouldDisplayPartialIcon = isFirstLevelWithItems
                && (
                    isSomeCheckedButNotRoot(isSomeChecked, props.isChecked)
                        || isRootCheckedButNotAll(isAllChecked, props.isChecked)
                );

            return (
                <Icon
                    name={shouldDisplayPartialIcon ? 'minis_sq' : 'expand_right'}
                    className={bem.element('icon', {
                        opened: !shouldDisplayPartialIcon && props.item.isOpened,
                    })}
                />
            );
        },
        [bem, isAllChecked, isFirstLevelWithItems, isSomeChecked, props.isChecked, props.item.isOpened],
    );

    return (
        <tr
            key={props.item.uniqueId}
            className={bem(
                bem.block({
                    selected: props.isChecked,
                    opened: props.item.isOpened,
                    level: props.item.level,
                    disabled: props.item.disabled,
                }),
                props.className,
            )}
        >
            <td className={bem.element('checkbox')}>
                <div className={bem.element('checkbox-wrapper')}>
                    {props.children}
                </div>
            </td>
            <td
                className={bem.element('content')}
            >
                <div
                    className={bem.element('content-wrapper', {
                        'has-items': !props.hasIconExpandOnly && props.item.hasItems,
                    })}
                    style={{
                        paddingLeft: !props.hideIcon && `${props.item.level * props.levelPadding + paddingBasedOnIcon}px`,
                    }}
                    onClick={props.item.onClick}
                    onKeyDown={(e) => e.key === 'Enter' && props.item.onClick(e)}
                    role='button'
                    tabIndex={0}
                >
                    {props.item.hasItems && renderIcon()}
                    <Text
                        className={bem.element('label')}
                        content={props.item.label}
                    />
                </div>
            </td>
        </tr>
    );
}
