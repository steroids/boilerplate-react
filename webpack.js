const getWebpackConfig = () => ({
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
});

require('@steroidsjs/webpack').config({
    inlineSvg: true,
    port: process.env.APP_SSR_PORT || 9991,
    webpack: getWebpackConfig(),
});
