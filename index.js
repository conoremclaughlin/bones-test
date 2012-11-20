var bonesTest = module.exports = {};

// See the tests in this module for examples.

// Server is the Bones core server.
bonesTest.server = require('./lib/server');

// Test model.
bonesTest.testModel = require('./lib/model');

// Test model CRUD.
bonesTest.testModelCRUD = require('./lib/model-crud');

// Test model CRUD with HTTP requests.
bonesTest.testModelCRUDHTTP = require('./lib/model-crud-http');

// Dummy models and various utility functions.
// TODO: expose directly in bonesTest
bonesTest.utils = require('./lib/utils');
