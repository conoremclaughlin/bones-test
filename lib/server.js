var Bones = require('bones');
var plugin = Bones.plugin;

module.exports = function(args) {
    // Load models from bones-test fixture for use anywhere.
    // require('../test/fixture');
    plugin.argv = require('optimist')([
        'start', '--host=127.0.0.1'
    ]).argv;

    // .
    var command = plugin.commands['start'];
    plugin.loadConfig(command);

    // Core is supposed to be the only root server.
    return new plugin.servers['Core'](plugin);
};
