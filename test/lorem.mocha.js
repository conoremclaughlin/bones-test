require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Lorem, a simple model', function() {
    before(function(done) {
        server.start(done);
    });

    after(function(done) {
        server.on('close', done);
        server.close();
    });

    bonesTest.testModel(server, 'Lorem');

    bonesTest.testModelCRUD(server, 'Lorem', {
        id: 'lorem',
        name: 'lorem'
    });

});
