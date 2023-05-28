// project name 
const projectName = "Мой сайт";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    entry: {
        app: "./src/assets/js/index.js"
    },
    output: {
        clean: true,
        filename: `./assets/javascript/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        assetModuleFilename: 'assets/img/[hash][ext][query]'
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'app'),
        },
        open: true,
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: false,
                },
            },
            // {
            //     test: /\.(png|jpeg|jpg|svg)$/i,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]',
            //         outputPath: './assets/img',
            //         publicPath: './assets/img',
            //         esModule: false,
            //     }
            // },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/fonts/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: projectName,
            filename: 'index.html',
            template: 'src/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: `./assets/style/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/assets/img'), to: path.resolve(__dirname, 'app/assets/img')},
            ]
        }),
        new CleanWebpackPlugin(),
    ]
}