model = Backbone.Model.extend({
    isNew: function() {
        // This is required because we are building IDs inside the model.
        // Another way could be providing a public method that builds the ID.
        return false;
    },
    url: function() {
        return '/api/Dolor/' + encodeURIComponent(this.id);
    }
});
