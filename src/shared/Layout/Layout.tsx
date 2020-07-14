import * as React from 'react';
import {Notifications} from '@steroidsjs/core/ui/layout';
import layout, {ILayoutHocOutput, STATUS_LOADING, STATUS_OK} from '@steroidsjs/core/hoc/layout';

import {bem, components} from '@steroidsjs/core/hoc';
import './Layout.scss';

import {IComponentsHocOutput} from '@steroidsjs/core/hoc/components';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import Header from '@steroidsjs/core/ui/layout/Header';
import {ROUTE_ROOT} from '../../routes';

@bem('Layout')
@components('http')
@layout(
    /*props => props.http.post('/api/v1/init', {
        timestamp: Date.now(),
    }),*/
    () => Promise.resolve({})
)
export default class Layout extends React.PureComponent<IBemHocOutput & IComponentsHocOutput & ILayoutHocOutput> {

    static propTypes = {
    };

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                <Header
                    logo={{
                        title: __('Boilerplate React'),
                    }}
                    nav={{
                        items: ROUTE_ROOT,
                    }}
                />
                <div className={bem.element('content')}>
                    <Notifications/>
                    {this.renderContent()}
                </div>
            </div>
        );
    }

    renderContent() {
        switch (this.props.status) {
            case STATUS_LOADING:
                return null;

            case STATUS_OK:
                return this.props.children;
        }

        // TODO other statuses
        return this.props.status;
    }

}
