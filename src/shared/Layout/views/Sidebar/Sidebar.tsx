import React from 'react';
import useBem from '@steroidsjs/core/hooks/useBem';
import Tree from '@steroidsjs/core/ui/nav/Tree';
import {Button} from '@steroidsjs/core/ui/form';
import {logout} from '@steroidsjs/core/actions/auth';
import {useDispatch} from '@steroidsjs/core/hooks';

import './Sidebar.scss';

export default function Sidebar() {
    const bem = useBem('Sidebar');
    const dispatch = useDispatch();

    return (
        <div className={bem.block()}>
            <Tree items='root' />
            <Button
                className={bem.element('logout_btn')}
                onClick={() => dispatch(logout())}
                label={__('Выйти')}
            />
        </div>
    );
}
