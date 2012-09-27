var store = {};

// Demonstrate a model that builds the ID from its name.
models['Dolor'].prototype.sync = function(method, model, options) {
    options || (options = {});
    var success = options.success, error = options.error;

    var name = model.get('name') || null;
    if (!name) return error('Name is required');

    var id = name.toLowerCase().replace(/ +/g, '_').replace(/[^_\w]/g, '');
    model.set({
        id: name
    }, {
        silent: true
    });

    if (method === 'read') {
        return store[id] ? success(store[id]) : error('Model not found.');
    } else if (method === 'create' || method === 'update') {
        store[id] = model.toJSON();
    } else if (method === 'delete') {
        delete store[id];
    }
    success(store[id] || {});
};
