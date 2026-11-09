import path from 'node:path'
import { fileURLToPath } from 'node:url'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('webpack').Configuration} */
const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/main.tsx',
    output: {
        filename: isProduction ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/',
        clean: true,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@src': path.resolve(process.cwd(), 'src'),
            'react/jsx-runtime.js': 'react/jsx-runtime',
            'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: 'tsconfig.json',
                    },
                },
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: shouldUseSourceMap,
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
                exclude: /.*base\.scss$/,
            },
            {
                test: /.*base\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif|webp)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './src/assets/ladybug.svg',
        }),
        {
            apply(compiler) {
                compiler.hooks.compilation.tap('LadybugFavicon', (compilation) => {
                    HtmlWebpackPlugin.getCompilationHooks(compilation).alterAssetTags.tap(
                        'LadybugFavicon',
                        (data) => {
                            for (const tag of data.assetTags.meta) {
                                if (tag.attributes?.rel === 'icon') {
                                    tag.attributes.type = 'image/svg+xml'
                                }
                            }
                            return data
                        },
                    )
                })
            },
        },
    ],
    devServer: {
        static: './',
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 5173,
    },
    }

export default config

