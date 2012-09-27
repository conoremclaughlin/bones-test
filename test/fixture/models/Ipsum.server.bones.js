var store = {};

// Demonstrate a model that uses the name as the ID.
models['Ipsum'].prototype.sync = function(method, model, options) {
    options || (options = {});
    var success = options.success, error = options.error;

    var name = model.get('name') || null;
    if (!name) return error('Name is required');

    var id = name;

    if (method === 'read') {
        return store[id] ? success(store[id]) : error('Model not found.');
    } else if (method === 'create' || method === 'update') {
        store[id] = model.toJSON();
    } else if (method === 'delete') {
        delete store[id];
    }
    success(store[id] || {});
};
