require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Dolor, a simple model builds the ID from its name', function() {
    bonesTest.testModel(server, 'Dolor');
    bonesTest.testModelCRUD(server, 'Dolor', {
        name: 'Dolor'
    }, {
        another: 'Sit'
    });
});
