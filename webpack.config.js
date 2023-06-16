const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        './src/index.html',
        './src/js/main.js',
        './src/scss/index.scss'
        ],
    output: {
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                loader: "file-loader",
                test: /\.html$/,
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                    ]
            }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
}