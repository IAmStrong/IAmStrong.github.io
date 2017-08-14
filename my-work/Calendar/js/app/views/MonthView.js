'use strict';

var App = App || {};

App.Views.Month = (function () {
    var tpl = App.Templates.Month;

    var render = function () {
        var $el = $('.calendar'),
            data = {
                'todayMonth': App.Calendar.today.monthName,
                'month': App.Calendar.data.month.name,
                'currentYear': App.Calendar.today.year,
                'year': App.Calendar.data.year.value,
                'todayDay': App.Calendar.today.day
            },
            days = App.Calendar.data.week.days,
            today = _.extend({'data': days}, data),
            template = tpl(today);

            $el.html(template);
    };

    return {
        render: render
    };
})();