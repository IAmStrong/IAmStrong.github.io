'use strict';

var App = App || {};

App.ContextMenuView = (function () {
    function ContextMenuView () {
        var contextMenu = App.helpers.find('.context-menu'),
            _share = {}; // Sharing data between scopes.

        this.addContextMenu = function(view) { // Context menu initialization.
            view.addEventListener('contextmenu', runContextMenu);
        };

        function runContextMenu(event) {
            var removeButton = contextMenu.querySelector('.btn_remove'),
                editButton = contextMenu.querySelector('.btn_edit');

            event.preventDefault();
            _share.view = this;

            removeButton.addEventListener('click', remove, false);
            editButton.addEventListener('click', edit, false);

            showMenu(event.pageX, event.pageY);
        }

        function showMenu(x, y) {
            contextMenu.style.left = x + 'px';
            contextMenu.style.top = y + 'px';
            contextMenu.classList.add('show');
        }

        function hideMenu(event) {
            var targetClassName = event.target.className,
                className = 'context-menu show',
                isClickedOnMenu = targetClassName === className ? true : false;

            if (!isClickedOnMenu) contextMenu.classList.remove('show');
        }

        function remove () { // The remove button's action.
            var id = _share.view.className;

            App.mediator.publish('action-remove', id);
        }

        function edit () { // The edit button's action.
            var id = _share.view.className;
            
            App.mediator.publish('action-edit', id);
        }

        document.addEventListener('click', hideMenu, false);

        return this;
    }

    return ContextMenuView;
})();