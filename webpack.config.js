//entry -> output 
const path = require('path')
const pathUrl = path.join(__dirname, 'public')
module.exports = {
    entry: './src/app.js',
    output: {
        path: pathUrl,
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: pathUrl
    }
}

//loader

