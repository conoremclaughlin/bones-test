var Bones = require('bones');
var plugin = Bones.plugin;

module.exports = function(args) {
    plugin.argv = require('optimist')([
        'start', '--host=127.0.0.1'
    ]).argv;

    // .
    var command = plugin.commands['start'];
    plugin.loadConfig(command);

    // Core is supposed to be the only root server.
    return new plugin.servers['Core'](plugin);
};
