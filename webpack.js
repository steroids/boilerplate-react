process.env.APP_BACKEND_URL = process.env.APP_BACKEND_URL || 'https://orion-tracking.kozhin.dev';

require('@steroidsjs/webpack').config({
    port: 9700,
    baseUrl: 'frontend/',
    inlineSvg: true,
});
