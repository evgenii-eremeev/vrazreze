var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './client.js',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ],

    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react&plugins[]=transform-runtime']
            },
            {
                test: /\.css$/,
                // css-loader responsible for css modules,
                // modules quiry parameter we neet to be able to import css in javascript
                loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
            },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
            // Webpack 1.0
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
