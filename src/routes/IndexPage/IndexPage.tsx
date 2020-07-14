import * as React from 'react';
import {bem} from '@steroidsjs/core/hoc';

import './IndexPage.scss';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';

@bem('IndexPage')
export default class IndexPage extends React.PureComponent<IBemHocOutput> {

    static propTypes = {};

    render() {
        const bem = this.props.bem;
        return (
            <div className={bem.block()}>
                Hello ;)
            </div>
        );
    }

}
