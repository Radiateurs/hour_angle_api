/* Transform the files using babel to allow import in js files. */
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    node: 'current'
                }
            }
        ]
    ],
    plugins: [
        'require-context-hook'
    ],
    babelrc: false,
    configFile: false
});