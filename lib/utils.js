var _ = require('underscore');
var debug = require('debug');
var utils = module.exports = {};

// TODO: break this file apart into dummy.js and some other file for convenient methods.
utils.initStart = function(server, beforeTests, afterTests) {
    // TODO: check if it's started.
    before(beforeTests || function(done) {
        server.start(done);
    });

    after(afterTests || function(done) {
        server.on('close', done);
        try {
            server.close();
        } catch (err) {
            // server already closed.
            done();
        }
    });
};

// everything
// generate shallow dummy data for an object.
utils.dummyObject = function(object, keyValueHandler) {
    var data = {};

    _.each(_.keys(object), function(key) {
        data[key] = keyValueHandler ? keyValueHandler(key, object[key]) : 'initial' + key;
    });

    return data;
};

// bones
// generate dummy data from a model and its schema.
utils.dummyModel = function(server, modelName, kvHandler) {
 var schema = server.plugin.models[modelName].schema;
 return utils.dummyObject(schema, kvHandler);
};

// mongoose
// wrapper for dummyModel
utils.dummyMongooseModel = function(server, modelName) {
    return utils.dummyModel(server, modelName, utils.mongooseKvHandler);
};

// mongoose
// format dummy data for a schema type
utils.mongooseKvHandler = function(key, value) {
    switch(value) {
    case 'String':
        value = 'initial String ' + key;
        break;
    case 'Date':
        value = new Date;
        break;
    case 'Number':
        value = 1;
        break;
    case 'Oid':
        value = Ox0001; // hex value for Oids
        break;
    default:
        value = 'initial ' + key;
        break;
    }

    return value;
};