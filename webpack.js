require('@steroidsjs/webpack').config({
    inlineSvg: true,
    port: 9991,
    webpack: {
        watchOptions: {
            poll: 1000,
            ignored: [
                '**/.git/**',
                '**/node_modules/**',
            ],
        },
    },
});
