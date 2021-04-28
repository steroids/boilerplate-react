import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';

import './IndexPage.scss';
import Grid from '@steroidsjs/core/ui/list/Grid/Grid';

export default function IndexPage() {
    const bem = useBem('IndexPage');
    return (
        <div className={bem.block()}>
            <Grid
                listId='Messages'
                action='/api/v1/track/messages'
                columns={[
                    {
                        attribute: 'companyId',
                        label: __('Компания'),
                    },
                    {
                        attribute: 'carId',
                        label: __('Авто'),
                    },
                    {
                        attribute: 'createTime',
                        label: __('Время'),
                        format: 'DateTimeFormatter',
                    },
                ]}
            />
        </div>
    );
}
