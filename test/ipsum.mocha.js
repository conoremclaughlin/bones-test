require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Ipsum, a simple model uses the name as the ID', function() {
    bonesTest.testModel(server, 'Ipsum');
    bonesTest.testModelCRUD(server, 'Ipsum', {
        name: 'Ipsum'
    }, {
        another: 'Dolor'
    });
    bonesTest.testModelCRUDHTTP(server, 'Ipsum', {
        name: 'Ipsum'
    }, {
        another: 'Dolor'
    });
});
