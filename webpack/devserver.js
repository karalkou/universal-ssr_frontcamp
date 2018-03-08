module.exports = function returnDevServerConfig() {
    return {
        devServer: {
            proxy: [{
                path: '/login',
                target: 'http://localhost:9000', // port of mock server
            }],
            historyApiFallback: true,
        },
    };
};
