import {logout} from '@steroidsjs/core/actions/auth';
import {useDispatch} from '@steroidsjs/core/hooks';
import useBem from '@steroidsjs/core/hooks/useBem';
import {Button} from '@steroidsjs/core/ui/form';
import Tree from '@steroidsjs/core/ui/nav/Tree';
import React from 'react';

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
