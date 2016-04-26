var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './client.js'
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
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
