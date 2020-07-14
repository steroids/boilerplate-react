require('@steroidsjs/webpack')
    .config({
        port: 9991,
        sourcePath: __dirname + '/src',
        staticPath: '',
        baseUrl: 'frontend/',
        devServer: {
            historyApiFallback: {
                index: '/frontend/index.html',
            },
            proxy: [
                {
                    context: ['/api'],
                    target: process.env.APP_BACKEND_URL || 'http://boilerplate-react.loc',
                    changeOrigin: true,
                },
            ],
        },
    })
    .base(__dirname + '/src/index.tsx');
