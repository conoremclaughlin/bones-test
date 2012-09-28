var should = require('should');

// TODO: doc about data and dataUpdate.
// TODO: display errors.
module.exports = function(server, modelName, data, dataUpdate) {
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
        it('should be able to save and return the saved data', function(done) {
            new model().save(data, {
                success: function(_model, res) {
                    res.should.be.a('object');
                    _model.should.be.a('object');
                    _model.should.have.property('get');
                    _(data).each(function(value, key) {
                        res.should.have.property(key, value);
                        _model.get(key).should.equal(value);
                    });
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
                    _model.should.be.a('object');
                    _model.should.have.property('get');
                    _(data).each(function(value, key) {
                        res.should.have.property(key, value);
                        _model.get(key).should.equal(value);
                    });
                    setTimeout(done, 1);
                },
                error: function(_model, err) {
                    should.fail('expected no error.');
                    setTimeout(done, 1);
                }
            });
        });

        // Update.
        if (dataUpdate) {
            // Update.
            it('should be able to update and return the updated data', function(done) {
                new model(data).save(dataUpdate, {
                    success: function(_model, res) {
                        res.should.be.a('object');
                        _model.should.be.a('object');
                        _model.should.have.property('get');
                        _(dataUpdate).each(function(value, key) {
                            res.should.have.property(key, value);
                            _model.get(key).should.equal(value);
                        });
                        setTimeout(done, 1);
                    },
                    error: function(_model, err) {
                        should.fail('expected no error.');
                        setTimeout(done, 1);
                    }
                });
            });

            // Load after update.
            it('should be able to fetch', function(done) {
                new model(data).fetch({
                    success: function(_model, res) {
                        res.should.be.a('object');
                        _model.should.be.a('object');
                        _model.should.have.property('get');
                        _(dataUpdate).each(function(value, key) {
                            res.should.have.property(key, value);
                            _model.get(key).should.equal(value);
                        });
                        setTimeout(done, 1);
                    },
                    error: function(_model, err) {
                        should.fail('expected no error.');
                        setTimeout(done, 1);
                    }
                });
            });
        }

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
