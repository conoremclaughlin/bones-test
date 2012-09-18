module.exports = function(server, modelName) {
    it('should be a model', function(done) {
        server.plugin.models.should.be.a('object');
        server.plugin.models.should.have.property(modelName);
        setTimeout(done, 1);
    });
};
