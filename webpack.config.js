const path = require('path');


module.exports = {
    // the entry file for the bundle
    entry: path.join(__dirname, '/src/index.js'),

    // the bundle file we will get in the result
    output: {
        path: path.join(__dirname, '/public/build'),
        filename: 'app.js',
    },

    module: {

        // apply loaders to files that meet given conditions
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, '/src'),
            loader: 'babel-loader',
            query: {
                presets: ["react", "es2015"]
            }
        },
            { test: /\.css$/,
              loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    },

    // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
    watch: true
};
