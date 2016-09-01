'use strict';

var App = App || {};

App.Locations = (function () {
    var collection = {};

    function Locations(data) {
        var locations = data || {};
console.log(data);
        locations.forEach(function(location) {
            var model = new App.Location(location),
                id = model.get().id;

            collection[id] = model;
        });

        this.forEach = function(callback) { // Public method to iterate over the collection.
            Object.keys(collection).forEach(function(location) {
                callback(collection[location]);
            });
        };

        this.getLocation = function(id) {
            return collection[id];
        };

        this.addLocation = function(location) {
            var model = new App.Location(location),
                id = model.get().id;

            collection[id] = model;

            return model;
        };

        this.removeLocation = function(id) {
           delete collection[id];
        };

        this.editLocation = function(location, id) {
           collection[id].update(location);

           return collection[id];
        };

        return this;
    }

    return Locations;
})();