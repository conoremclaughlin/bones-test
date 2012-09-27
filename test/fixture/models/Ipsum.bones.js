model = Backbone.Model.extend({
    idAttribute: 'name',
    url: function() {
        return '/api/Ipsum/' + encodeURIComponent(this.id);
    }
});
