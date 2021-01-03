/* config-overrides.js */
const { VextPackPlugin } = require('vextpack');

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(
        new VextPackPlugin({
            outputPath: '../',
            hotReloadSupport: env !== 'production'
        })
    );

    return config;
}
