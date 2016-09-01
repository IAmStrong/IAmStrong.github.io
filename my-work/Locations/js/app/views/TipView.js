'use strict';

var App = App || {};

App.TipView = (function () {
    function TipView () {
        var element = App.helpers.find('.locations'),
            template = App.templates.tipTpl();

        this.render = function () {
            var tpl = template();

            element.insertAdjacentHTML('beforeend', tpl);
            addEventHandlers();
        };

        function addEventHandlers () {
            var main = App.helpers.find('#main');

            main.addEventListener('click', hideTip, false);
            main.addEventListener('contextmenu', hideTip, false);
        }

        function hideTip () {
            var tip = App.helpers.find('.tip');

            App.helpers.addClass(tip, ['animated', 'fadeOutDown']);
            main.removeEventListener('click', hideTip, false);
            main.removeEventListener('contextmenu', hideTip, false);

            setTimeout(function () { // Animation's timeout.
                App.helpers.addClass(tip, ['hidden']);
            }, 830);
        }

        return this;
    }

    return TipView;
})();