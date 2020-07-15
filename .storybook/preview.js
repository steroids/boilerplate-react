import React from 'react';
import {addDecorator} from '@storybook/react';

import Application from '../src/Application';

addDecorator(getStory => (
    <Application>
        {getStory()}
    </Application>
));
