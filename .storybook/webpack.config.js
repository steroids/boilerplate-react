const path = require('path');

module.exports = require('@steroidsjs/webpack/config.storybook')({
    webpack: {
        resolve: {
            modules: [
                path.resolve(__dirname, '../node_modules'),
                path.resolve(__dirname, '../src'),
            ],
        },
    },
});
