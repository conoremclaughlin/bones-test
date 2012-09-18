model = Backbone.Model.extend({
    url: function() {
        return '/api/Lorem/' + encodeURIComponent(this.id);
    }
});
