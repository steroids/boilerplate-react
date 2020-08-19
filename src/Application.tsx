import * as React from 'react';
import {hot} from 'react-hot-loader';
import Router from '@steroidsjs/core/ui/nav/Router';
import {application} from '@steroidsjs/core/hoc';

import 'style/index.scss';

@hot(module)
@application({
    onInit: ({ui}) => {
        ui.addViews(require('@steroidsjs/bootstrap').default);
        ui.addFields(require('@steroidsjs/core/ui/form').default);
        ui.addFormatters(require('@steroidsjs/core/ui/format').default);
    },
})
export default class Application extends React.PureComponent {

    render() {
        return (
            <Router
                wrapperView={require('shared/Layout').default}
                routes={require('routes').default}
            />
        );
    }
}
