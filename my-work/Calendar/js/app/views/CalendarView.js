'use strict';

var App = App || {};

App.Views.Calendar = (function () {
    var calendar = App.Models.Calendar,
        tpl = App.Templates.Calendar,
        mediator = App.mediator,
        $el = $('.wrapper'),
        buttons = {};

    var states = {
        'week': function () {
            _showWeek();
        },
        'month': function () {
            _showMonth();
        },
        'year': function () {
            _showYear();
        }
    };

    var render = function (state) {
        var template = tpl();

        $el.html(template);

        buttons.nav = {
            'week': $('.button-week'),
            'month': $('.button-month'),
            'year': $('.button-year')
        };

        buttons.pagination = {
            'next': $('.pagination .next'),
            'prev': $('.pagination .prev')
        };

        _loadListeners();

        states[state]();
    };

    var _loadListeners = function () {
        $.each(buttons.nav, function (i, item) {
            item.on('click', _changeState);
        });

        $.each(buttons.pagination, function (i, item) {
            item.on('click', _navigate);
        })
    };

    var _changeState = function () {
        var current = $(this),
            isActive = current.hasClass('active'),
            state = current.attr('data-state');

        if (!isActive) {
            $.each(buttons.nav, function (i, button) {
                var active = button.hasClass('active');

                if (active) button.removeClass('active');
            });

            current.addClass('active');

            App.Calendar.state = state;

            calendar.resetState();

            states[state]('current');
        }
    };

    var _showYear = function () {
        var year = App.Calendar.data.year.value,
            yearView = App.Views.Year;

        mediator.publish('Year: Change', year);
        yearView.render();
    };

    var _showMonth = function () {
        var month = App.Calendar.data.month.name,
            year = App.Calendar.data.year.value,
            monthView = App.Views.Month;

        mediator.publish('Month: Change', {month: month, year: year});
        monthView.render();
    };

    var _showWeek = function () {
        var currentWeek = App.Calendar.data.week,
            weekRange = currentWeek.start + ' - ' + currentWeek.end,
            year = App.Calendar.data.year.value,
            weekView = App.Views.Week;

        mediator.publish('Week: Change', {year: year, weekRange: weekRange});
        weekView.render();
    };

    var _navigate = function () {
        var action = $(this).attr('data-nav'),
            state = App.Calendar.state,
            monthView = App.Views.Month,
            weekView = App.Views.Week,
            yearView = App.Views.Year;  

        var states = {
            'week': function (action) {
                calendar.set('week', action);

                var currentWeek = App.Calendar.data.week,
                    weekRange = currentWeek.start + ' - ' + currentWeek.end,
                    year = App.Calendar.data.week.currentYear;

                mediator.publish('Week: Change', {weekRange: weekRange, year: year});

                weekView.render();
            },
            'month': function (action) {
                calendar.set('month', action);

                var month = App.Calendar.data.month.name,
                    year = App.Calendar.data.year.value;

                mediator.publish('Month: Change', {month: month, year: year});
                monthView.render();
            },
            'year': function (action) {
                calendar.set('year', action);

                var year = App.Calendar.data.year.value;

                mediator.publish('Year: Change', year);
                yearView.render();
            }
        };

        return states[state](action);
    };

    return {
        render: render
    };
})();