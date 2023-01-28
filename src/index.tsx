/// <reference types="@steroidsjs/core/index" />

import * as React from 'react';
import {render} from 'react-dom';

import Application from './Application';

render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>,
    document.getElementById('root'),
);
