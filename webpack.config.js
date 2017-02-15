module.exports = {
    entry: {
        app: './app'
    },

    output: {
        path: './public',  // FS-путь к статике
        publicPath: '/', // Web-путь к статике (CDN?)
        filename: 'app.js'
    },

    watch: true,

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.js$/,           // .../node_modules/loader!file...
                include: __dirname + '/frontend',
                loader: "babel-loader",
                options: {
                    presets: ['es2015']
                }
            }
        ]
    }
};