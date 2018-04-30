var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var BUILD_DIR2 = path.resolve(__dirname, 'src/client/public2');
var APP_DIR2 = path.resolve(__dirname, 'src/client/app2');

var BUILD_DIR3 = path.resolve(__dirname, 'src/client/public3');
var APP_DIR3 = path.resolve(__dirname, 'src/client/app3');

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

var config3 = {
    mode: 'development',
    entry: {
        "bundle3": [APP_DIR3 + '/index.js']
    },
    output: {
        path: BUILD_DIR3,
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
    config, config2, config3
];