app.factory('shareData', function () {
    var mem = {};

    return {
        store: function(key, value) {
            mem[key] = value;
        },
        get: function(key) {
            return mem[key];
        },
        call: function(key) {
            return mem[key]();
        }
    };
});