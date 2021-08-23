module.exports = {
    publicPath: '/maoyan',
    devServer: {
        proxy: {
            '/api2': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            '/ajax': {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            },
            '/searchlist': {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            },
            '/geo': {
                target: 'https://api.asilu.com',
                changeOrigin: true
            }
        }
    }
}
  