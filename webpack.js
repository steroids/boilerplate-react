process.env.APP_BACKEND_URL = process.env.APP_BACKEND_URL || '';

require('@steroidsjs/webpack').config({
    port: 9991,
    baseUrl: 'frontend/',
    inlineSvg: true,
});
