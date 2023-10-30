const path = require('path');

const STEROIDS_CORE_PATH = '../../../Steroids/dev/steroids/react/src';
const STEROIDS_BOOTSTRAP_PATH = '../../../Steroids/dev/steroids/react-bootstrap/src';

require('@steroidsjs/webpack').config({
    inlineSvg: true,
    port: 9991,
    webpack: {
        resolve: {
            alias: {
                '@steroidsjs/core': path.resolve(__dirname, STEROIDS_CORE_PATH),
                '@steroidsjs/bootstrap': path.resolve(__dirname, STEROIDS_BOOTSTRAP_PATH),
            },
        },
    },
});
