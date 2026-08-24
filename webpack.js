const path = require('path');

require('@steroidsjs/webpack').config({
    inlineSvg: true,
    port: 9991,
    webpack: {
        resolve: {
            alias: {
                '@steroidsjs/core': path.resolve(__dirname, '../react/src'),
                '@steroidsjs/bootstrap': path.resolve(__dirname, '../react-bootstrap/src'),
            },
        },
    }
});
