'use strict';

var App = App || {};

App.Views.Year = (function () {
    var tpl = App.Templates.Year;

    var render = function () {
        var currentYear = App.Calendar.data.year.value,
            months = App.Calendar.data.year.months,
            today = App.Calendar.today,
            $el = $('.calendar'),
            data = _.extend({
                'today': today,
                'currentYear': currentYear
            }, months),
            template = tpl({data: data});

        $el.html(template);
    };

    return {
        render: render
    };
})();