const path = require('path')

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, './dev.tsconfig.json')
                        }
                    }
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist', 'app'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        publicPath: '/app/',
        port: 9000,
    },
}