import {IPreparedTreeItem} from '@steroidsjs/core/hooks/useTree';

import {IPermissionTreeSchema} from 'api/auth/permissions';

export const isSomeCheckedButNotRoot = (
    isSomeSelected: boolean,
    isRootChecked: boolean,
) => isSomeSelected && !isRootChecked;
export const isRootCheckedButNotAll = (
    isAllSelected: boolean,
    isRootChecked: boolean,
) => !isAllSelected && isRootChecked;

export const isAllOrSomeNestedItemsChecked = (
    item: any,
    selectedIds: string[],
) => (item.items || [])
    .reduce((result, child) => {
        const isSelected = selectedIds.includes(child.id);

        const childResult = Array.isArray(child.items) && child.items.length > 0
            ? isAllOrSomeNestedItemsChecked(child, selectedIds)
            : {
                isAllChecked: isSelected,
                isSomeChecked: isSelected,
            };

        return {
            isAllChecked: result.isAllChecked && childResult.isAllChecked,
            isSomeChecked: result.isSomeChecked || childResult.isSomeChecked,
        };
    }, {
        isAllChecked: true,
        isSomeChecked: false,
    });
