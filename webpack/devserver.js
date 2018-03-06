module.exports = function returnDevServerConfig() {
    return {
        devServer: {
            proxy: [{
                path: '/blogs',
                target: 'http://localhost:8000' // port of mock server
            }],
            historyApiFallback: true
        },
    };
};
