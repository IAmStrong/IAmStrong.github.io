'use strict';

var App = App || {};

App.LocationView = (function () {
    function LocationView () {
        var template = App.templates.locationTpl();

        this.render = function(location) {
            var div = document.createElement('div'),
                model = location.get(),
                view = template(model),
                id = model.id;

            div.className = id;
            div.insertAdjacentHTML('afterBegin', view);

            return div;
        };

        this.updateView = function(location) {
            var model = location.get(),
                view = template(model);

            return view;
        };

        return this;
    }

    return LocationView;
})();