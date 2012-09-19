var should = require('should');

module.exports = function(server, modelName, data) {
    var model = server.plugin.models[modelName];
    if (!model) return;

    describe('CRUD', function() {
        // Load before save.
        it('should fail to fetch', function(done) {
            new model(data).fetch({
                success: function(_model, res) {
                    should.fail('expected an error.');
                    setTimeout(done, 1);
                },
                error: function(_model, err) {
                    setTimeout(done, 1);
                }
            });
        });

        // Create.
        it('should be able to save', function(done) {
            new model().save(data, {
                success: function(_model, res) {
                    res.should.be.a('object');
                    // TODO: check return.
                    setTimeout(done, 1);
                },
                error: function(_model, err) {
                    should.fail('expected no error.');
                    setTimeout(done, 1);
                }
            });
        });

        // Load after save.
        it('should be able to fetch', function(done) {
            new model(data).fetch({
                success: function(_model, res) {
                    res.should.be.a('object');
                    // TODO: check return.
                    setTimeout(done, 1);
                },
                error: function(_model, err) {
                    should.fail('expected no error.');
                    setTimeout(done, 1);
                }
            });
        });

        // Update.
        // TODO

        // Delete.
        it('should be able to destory', function(done) {
            new model(data).destroy({
                success: function(_model, res) {
                    res.should.be.a('object');
                    setTimeout(done, 1);
                },
                error: function(_model, err) {
                    should.fail('expected no error.');
                    setTimeout(done, 1);
                }
            });
        });

        // Load after delete.
        it('should fail to fetch', function(done) {
            new model(data).fetch({
                success: function(_model, res) {
                    should.fail('expected an error.');
                    setTimeout(done, 1);
                },
                error: function(_model, err) {
                    setTimeout(done, 1);
                }
            });
        });
    });
};
