'use strict';

var App = App || {};

App.LocationsView = (function () {
    function LocationsView(locations) {
        var locationView = new App.LocationView(),
            _share = {}; // Sharing data between scopes.

        this.template = App.templates.locationsTpl();

        this.render = function () { // Render location's collection.
            var container = App.helpers.find('.container'),
                contextMenu = new App.ContextMenuView(),
                addButton = App.helpers.find('.add');

            _share.container = container;
            _share.contextMenu = contextMenu;

            locations.forEach(function(location) {
                var view = locationView.render(location);

                contextMenu.addContextMenu(view);
                container.appendChild(view);
            });

            addButton.addEventListener('click', function () {
                var action = 'add';

                this.blur(); // Remove focus from the button.
                App.mediator.publish('action-add', action);
            });
        };

        this.renderOne = function(location) { // Render single location.
            var view = locationView.render(location);

            _share.contextMenu.addContextMenu(view);
            _share.container.appendChild(view);

            App.helpers.addClass(view, ['animated', 'rollIn']);

            setTimeout(function () { // Animation's timeout.
                App.helpers.removeClass(view, ['animated', 'rollIn']);
            }, 1000);
        };

        this.removeLocationView = function(className) {
            var element = App.helpers.findBy('class', className);

            App.helpers.addClass(element, ['animated', 'zoomOut']);

            setTimeout(function () { // Animation's timeout.
                element.parentNode.removeChild(element);
            }, 400);
        };

        this.updateView = function(location) { // Update edited location's view.
            var className = location.get().id,
                element = App.helpers.findBy('class', className),
                view = locationView.updateView(location);

            App.helpers.clear(element);
            element.insertAdjacentHTML('beforeend', view);
            App.helpers.addClass(element, ['animated', 'shake']);

            setTimeout(function () { // Animation's timeout.
                App.helpers.removeClass(element, ['animated', 'shake']);
            }, 600);
        };

        return this;
    }

    return LocationsView;
})();