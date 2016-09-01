'use strict';

var App = App || {};

App.CreateEditView = (function () {
    function CreateEditView () {
        var _share = {}; // Sharing data between scopes.

        this.showModal = function(action) { // Show modal dialog depending on action.
            var template = App.templates.createEditTpl(action),
                element = App.helpers.find('.popup'),
                isEmpty = App.helpers.isEmpty(element);

            _share.action = action;
            _share.element = element;

            element.classList.add('show');

            var actions = {
                add: function () {
                    var tpl = template();

                    if (isEmpty) element.insertAdjacentHTML('beforeend', tpl);
                },
                edit: function () {
                    var editData = _share.edit,
                        tpl = template(editData);

                    if (isEmpty) element.insertAdjacentHTML('beforeend', tpl);
                }
            };

            actions[action]();

            addEventHandlers();
        };

        this.hideModal = function () {
            var element = _share.element;

            element.classList.remove('show');
            App.helpers.clear(element);
        };

        this.editLocation = function(location) { // Current location's model for editing.
            var model = location.get();

            _share.edit = model;
        };

        function addEventHandlers () {
            var nameInput = App.helpers.find('#location'),
                submitButton = App.helpers.find('.submit'),
                closeButton = App.helpers.find('.close');

            nameInput.addEventListener('input', validateInput, false);
            submitButton.addEventListener('click', submitData, false);
            closeButton.addEventListener('click', closeModal, false);
            document.addEventListener('keydown', keyAction, false);
        }

        function submitData () { // Submit edited data
            var action = _share.action,
                data = getInputValues();

            if (action === 'add') App.mediator.publish('action-submit-add', data);
            if (action === 'edit') {
                var id = _share.edit.id;

                App.mediator.publish('action-submit-edit', data, id);
            }

            closeModal();
        }

        function getInputValues () {
            var nameData = App.helpers.find('#location').value || 'Gotham City',
                groupsData = App.helpers.find('#groups').value || '1',
                teachersData = App.helpers.find('#teachers').value || '1';

            var obj = {
                name: nameData,
                groups: groupsData,
                teachers: teachersData
            };

            return obj;
        }

        function closeModal () {
            removeEventHandler();
            App.mediator.publish('action-close');
        }

        function removeEventHandler () {
            document.removeEventListener('keydown', keyAction, false);
        }

        function validateInput () {
            var regExpPattern = /[^- a-zA-Z0-9]/g, // RegEx to prevent any symbols except dash, whitespace, letters and numbers.
                input = this;

            input.value = input.value.replace(regExpPattern, '');
        }

        function keyAction(event) { // Close modal on ESC key press, submit on ENTER.
            var ESC = event.keyCode === 27,
                ENTER = event.keyCode === 13;

            if (ESC) closeModal();
            if (ENTER) submitData();
        }

        return this;
    }

    return CreateEditView;
})();