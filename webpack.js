const path = require('path');

require('@steroidsjs/webpack').config({
    port: 9991,
    inlineSvg: true,
    webpack: {
        resolve: {
            alias: {
                '@steroidsjs/core': path.resolve(__dirname, '../react/src'),
                '@steroidsjs/bootstrap': path.resolve(__dirname, '../react-bootstrap/src'),
            },
        },
    },
});
