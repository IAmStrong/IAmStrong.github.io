'use strict';

var App = App || {};

App.Controller = (function () {
    function Controller () {
        var data = App.data,
            locations = new App.Locations(data),
            locationsView = new App.LocationsView(locations),
            createEditView = new App.CreateEditView(),
            tipView = new App.TipView();

        this.init = function () {

            renderMainView();
            initSubscriptions();

            function renderMainView () {
                var mainElement = App.helpers.find('.locations'),
                    template = locationsView.template();

                mainElement.insertAdjacentHTML('beforeend', template);
                locationsView.render();
                tipView.render();
            }

            function initSubscriptions () {
                App.mediator.subscribe('action-add', openModalDialog);
                App.mediator.subscribe('action-close', closeModalDialog);
                App.mediator.subscribe('action-remove', removeLocation);
                App.mediator.subscribe('action-edit', editLocation);
                App.mediator.subscribe('action-submit-add', submitDataAdd);
                App.mediator.subscribe('action-submit-edit', submitDataEdit);
            }

            function openModalDialog(action) {
                createEditView.showModal(action);
            }

            function closeModalDialog () {
                createEditView.hideModal();
            }

            function removeLocation(id) {
                locations.removeLocation(id);
                locationsView.removeLocationView(id);
            }

            function editLocation(id) {
                var location = locations.getLocation(id);

                createEditView.editLocation(location);
                openModalDialog('edit');
            }

            function submitDataAdd(data) {
                var model = locations.addLocation(data);

                locationsView.renderOne(model);
            }

            function submitDataEdit(data, id) {
                var location = locations.getLocation(id).get(),
                    equals = App.helpers.equalProperties(data, location);

                if (!equals) { // If data have changed - update the model and the view.
                     var editedModel = locations.editLocation(data, id);

                    locationsView.updateView(editedModel);
                }
            }
        };

        return this;
    }

    return Controller;
})();