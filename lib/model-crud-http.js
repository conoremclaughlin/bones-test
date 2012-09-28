var should = require('should');
var request = require('request');
var _ = require('bones')._;

// TODO: doc about data and dataUpdate.
module.exports = function(server, modelName, data, dataUpdate) {
    var model = server.plugin.models[modelName];
    if (!model) return;

    // @see bones/client/backbone.js
    // TODO: HTTP address; assume http://127.0.0.1:3000 for now.
    function getUrl(object) {
        if (!(object && object.url)) throw new Error(
            "A 'url' property or function must be specified");
        var url = _.isFunction(object.url) ? object.url() : object.url;
        return 'http://127.0.0.1:3000' + url;
    };

    // Use a custom cookie for requests other than GET.
    var j = request.jar();

    // @see bones/client/backbone.js
    var csrf = function(path, timeout) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZY0123456789';
        var token = '';
        while (token.length < 32) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Save the token to cookie.
        var cookie = request.cookie('bones.token=' + token);
        j.add(cookie);

        return token;
    };

    // Clone testing data and add the token.
    var token = csrf();
    var dataR = _(data).chain().clone().extend({
        'bones.token': token
    }).value();
    var dataUpdateR = _(dataUpdate).chain().clone().extend({
        'bones.token': token
    }).value();

    describe('CRUD with HTTP requests', function() {

        // TODO: check if it's started.
        before(function(done) {
            server.start(done);
        });

        after(function(done) {
            server.on('close', done);
            server.close();
        });

        // Load before save.
        it('should fail to fetch', function(done) {
            request.get({
                uri: getUrl(new model(data)),
                json: true
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 404);
                setTimeout(done, 1);
            });
        });

        // Create.
        it('should be able to save and return the saved data', function(done) {
            request.post({
                uri: getUrl(new model()),
                jar: j,
                json: true,
                body: dataR
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                // TODO: check return?
                setTimeout(done, 1);
            });
        });

        // Load after save.
        it('should be able to fetch', function(done) {
            request.get({
                uri: getUrl(new model(data)),
                json: true
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                body.should.be.a('object');
                _(data).each(function(value, key) {
                    body.should.have.property(key);
                    body[key].should.eql(value);
                });
                setTimeout(done, 1);
            });
        });

        // Update.
        if (dataUpdate) {
            // Update.
            it('should be able to update and return the updated data',
                function(done) {
                    request.put({
                        uri: getUrl(new model(data)),
                        jar: j,
                        json: true,
                        body: dataUpdateR
                    }, function(err, res, body) {
                        should.not.exist(err);
                        res.should.be.a('object');
                        res.should.have.property('statusCode', 200);
                        // TODO: check return?
                        setTimeout(done, 1);
                    });
                });

            // Load after update.
            it('should be able to fetch', function(done) {
                request.get({
                    uri: getUrl(new model(data)),
                    json: true
                }, function(err, res, body) {
                    should.not.exist(err);
                    res.should.be.a('object');
                    res.should.have.property('statusCode', 200);
                    body.should.be.a('object');
                    _(dataUpdate).each(function(value, key) {
                        body.should.have.property(key);
                        body[key].should.eql(value);
                    });
                    setTimeout(done, 1);
                });
            });
        }

        // Delete.
        it('should be able to destory', function(done) {
            var m = new model(dataR);
            request.del({
                uri: getUrl(m),
                jar: j,
                json: true,
                body: m.toJSON()
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                setTimeout(done, 1);
            });
        });

        // Load after delete.
        it('should fail to fetch', function(done) {
            request.get({
                uri: getUrl(new model(data)),
                json: true
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 404);
                setTimeout(done, 1);
            });
        });
    });
};
