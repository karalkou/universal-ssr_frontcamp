module.exports = function returnDevServerConfig() {
    return {
        devServer: {
            stats: 'errors-only',
            port: 9000,
        },
    };
};
