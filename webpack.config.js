import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const isProduction = process.env.NODE_ENV === 'production'

function amplitudeApiKey() {
    if (process.env.AMPLITUDE_API_KEY) return process.env.AMPLITUDE_API_KEY
    const envFile = path.resolve(process.cwd(), '.env.local')
    if (!existsSync(envFile)) return ''
    for (const line of readFileSync(envFile, 'utf8').split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eq = trimmed.indexOf('=')
        if (eq === -1) continue
        if (trimmed.slice(0, eq).trim() !== 'AMPLITUDE_API_KEY') continue
        let value = trimmed.slice(eq + 1).trim()
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1)
        }
        return value
    }
    return ''
}

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
                test: /\.(svg|png|jpe?g|gif|webp|pdf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.AMPLITUDE_API_KEY': JSON.stringify(amplitudeApiKey()),
        }),
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

