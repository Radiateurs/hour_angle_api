// webpack.config.js (tag: v1)

const path = require('path');

module.exports = {
    target: 'node',
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000 // Check for changes every second
    },
    context: path.resolve(__dirname, 'src'),
    externals: [{
        express: 'commonjs express',
    }],
    entry: {
        javascript: './index.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};