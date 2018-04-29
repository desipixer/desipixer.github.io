var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var BUILD_DIR2 = path.resolve(__dirname, 'src/client/public2');
var APP_DIR2 = path.resolve(__dirname, 'src/client/app2');

var config = {
    mode: 'development',
    entry: {
        "bundle1": [APP_DIR + '/index.js']
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    }
};

var config2 = {
    mode: 'development',
    entry: {
        "bundle2": [APP_DIR2 + '/index.js']
    },
    output: {
        path: BUILD_DIR2,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    }
}

module.exports = [
    config, config2
];