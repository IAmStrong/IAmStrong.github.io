'use strict';

var App = App || {};

App.Models.Calendar = (function () {
    moment.locale('ru');

    var init = function () {
        var now = moment(),
            currentValue = {
                isoDate: now.format('YYYY-MM-DD'),
                date: now.format('DD.MM.YYYY'),
                month: {
                    name: now.format('MMMM'),
                    value: now.format('MM'),
                },
                day: now.format('DD'),
                year: {
                    value: now.format('YYYY')
                },
                week: {}
            };

        currentValue.month.name = _capitalize(currentValue.month.name);
        currentValue.week = _weekData(currentValue.isoDate);
        currentValue.week.days = _getDays(currentValue.year.value, currentValue.month.value);
        currentValue.week.details = _getWeekDetails(currentValue.week.startIso, currentValue.week.endIso);
        currentValue.week.currentYear = now.format('YYYY');
        currentValue.year.months = _getMonths(currentValue.year.value);

        _currentDay();

        App.Calendar.data = currentValue;
    };

    var _getMonths = function (year) {
        var monthsCount = 12,
            months = {};

        for (var i = 1; i <= monthsCount; i++) {
            var currentMonth = moment().month(i - 1).format('MMMM'),
                value = year + '-' + ((i < 10 ? '0' + i : i)),
                daysInMonth = moment(value).daysInMonth(),
                startOf = moment(value).startOf().format('dddd');

            months[_capitalize(currentMonth)] = {
                days: daysInMonth,
                startOf: _capitalize(startOf)
            };
        }

        return months;
    };

    var _getDays = function (year, month) {
            var value = year + '-' + month,
                daysInMonth = moment(value).daysInMonth(),
                days = {};

            for (var i = 1; i <= daysInMonth; i++) {
                var isoDate = year + '-' + month + '-' + (i < 10 ? '0' + i : i),
                    dayOftheWeek = moment(isoDate).format('dddd');

                days[i] = _capitalize(dayOftheWeek);
            }

            return days;
    };

    function _changeYear (currentYear) {
        var now = moment(currentYear),
            currentValue = {
                year: {
                    value: now.format('YYYY')
                }
            };

        currentValue.year.months = _getMonths(currentValue.year.value);

        function _getMonths (year) {
            var monthsCount = 12,
                months = {};

            for (var i = 1; i <= monthsCount; i++) {
                var currentMonth = moment().month(i - 1).format('MMMM'),
                    value = year + '-' + ((i < 10 ? '0' + i : i)),
                    daysInMonth = moment(value).daysInMonth(),
                    startOf = moment(value).startOf().format('dddd');

                months[_capitalize(currentMonth)] = {
                    days: daysInMonth,
                    startOf: _capitalize(startOf)
                };
            }

            return months;
        }

        App.Calendar.data = currentValue;
    };

    function _changeMonth (currentMonth) {
        var now = moment(currentMonth),
            currentValue = {
                isoDate: now.format('YYYY-MM-DD'),
                month: {
                    name: now.format('MMMM'),
                    value: now.format('MM'),
                },
                year: {
                    value: now.format('YYYY')
                },
                week: {}
            };

        currentValue.month.name = _capitalize(currentValue.month.name);
        currentValue.week.days = _getDays(currentValue.year.value, currentValue.month.value);

        App.Calendar.data = currentValue;
    };

    var set = function (state, action) {
        var prev = action === 'prev',
            next = action === 'next';

        var states = {
            'week': function () {
                if (prev) {
                    _prevWeek();
                } else if (next) {
                    _nextWeek();
                }
            },
            'year': function () {
                if (prev) {
                    var format = moment(App.Calendar.data.year.value + '-01-01').format(),
                        lastYear = moment(format).subtract(1, 'year');

                    _changeYear(lastYear);
                } else if (next) {
                    var format = moment(App.Calendar.data.year.value + '-01-01').format(),
                        nextYear = moment(format).add(1, 'year');

                    _changeYear(nextYear);
                }
            },
            'month': function () {
                if (prev) {
                    var currentDate = App.Calendar.data.isoDate,
                        lastMonth = moment(currentDate).subtract(1, 'month');

                    _changeMonth(lastMonth);
                } else if (next) {
                    var currentDate = App.Calendar.data.isoDate,
                        nextMonth = moment(currentDate).add(1, 'month');

                    _changeMonth(nextMonth);
                }
            }
        };

        return states[state]();
    };

    var _weekData = function (date) {
        var start = moment(date.start || date).startOf('isoWeek'),
            end = moment(date.end || date).endOf('isoWeek');

        var weekStart = moment(start).format('DD.MM'),
            weekEnd = moment(end).format('DD.MM');

        return  {
            'start': weekStart,
            'end': weekEnd,
            'startIso': start,
            'endIso': end
        };
    };

    var _nextWeek = function () {
        var currentValue = {},
            currentWeekStart = App.Calendar.data.week.endIso,
            start = moment(currentWeekStart).add(1, 'weeks').startOf('isoWeek'),
            end = moment(currentWeekStart).add(1, 'weeks').endOf('isoWeek');

            var startYear = moment(start).format('YYYY'),
                endYear = moment(end).format('YYYY'),
                currentYear = (function () {
                    var year;

                    if (startYear === endYear) {
                        year = startYear;
                    } else {
                        year = startYear + ' - ' + endYear;
                    }

                    return year;
                })();

        currentValue = _weekData({
            start: start,
            end: end
        });

        App.Calendar.data.week = currentValue;
        App.Calendar.data.week.currentYear = currentYear;
        App.Calendar.data.week.details = _getWeekDetails(start, end);
    };

    var _prevWeek = function () {
        var currentValue = {},
            currentWeekStart = App.Calendar.data.week.endIso,
            start = moment(currentWeekStart).subtract(1, 'weeks').startOf('isoWeek'),
            end = moment(currentWeekStart).subtract(1, 'weeks').endOf('isoWeek');

            var startYear = moment(start).format('YYYY'),
                endYear = moment(end).format('YYYY'),
                currentYear = (function () {
                    var year;

                    if (startYear === endYear) {
                        year = startYear;
                    } else {
                        year = startYear + ' - ' + endYear;
                    }

                    return year;
                })();

        currentValue = _weekData({
            start: start,
            end: end
        });

        App.Calendar.data.week = currentValue;
        App.Calendar.data.week.currentYear = currentYear;
        App.Calendar.data.week.details = _getWeekDetails(start, end);
    };

    var _currentDay = function () {
        App.Calendar.today = {
            'monthName': _capitalize(moment().format('MMMM')),
            'dayName': _capitalize(moment().format('dddd')),
            'isoDate': moment().format('YYYY-MM-DD'),
            'year': moment().format('YYYY'),
            'month': moment().format('MM'),
            'day': moment().format('DD')
        };

        return {
            'day': moment().format('DD'),
            'month': moment().format('MM'),
            'year': moment().format('YYYY')
        };
    };

    var _getWeekDetails = function(startDate, endDate) {
        var now = startDate, 
            dates = [];

        while (now.isBefore(endDate) || now.isSame(endDate)) {
            dates.push({day: now.format('DD.MM'), year: now.format('YYYY')});
            now.add(1, 'days');
        }

        return {
            'Mo': {
                day: dates[0].day,
                year: dates[0].year,
                fullDate: dates[0].day + '.' + dates[0].year
            },
            'Tu': {
                day: dates[1].day,
                year: dates[1].year,
                fullDate: dates[1].day + '.' + dates[1].year
            },
            'We': {
                day: dates[2].day,
                year: dates[2].year,
                fullDate: dates[2].day + '.' + dates[2].year
            },
            'Th': {
                day: dates[3].day,
                year: dates[3].year,
                fullDate: dates[3].day + '.' + dates[3].year
            },
            'Fr': {
                day: dates[4].day,
                year: dates[4].year,
                fullDate: dates[4].day + '.' + dates[4].year
            },
            'Sa': {
                day: dates[5].day,
                year: dates[5].year,
                fullDate: dates[5].day + '.' + dates[5].year
            },
            'Su': {
                day: dates[6].day,
                year: dates[6].year,
                fullDate: dates[6].day + '.' + dates[6].year
            }
        };
    };

    var addEvent = function (event) {
        var year = App.Calendar.data.week.currentYear,
            _event = App.Models.CalendarEvent,
            week = App.Calendar.data.week,
            dimensions = event.dimensions,
            defaults = event.defaults,
            position = event.position,
            color = event.color,
            title = event.title,
            start = event.start,
            end = event.end,
            id = event.id;

        var weekId = week.start + '-' + week.end;
		
		if (!App.Calendar.Events) App.Calendar.Events = {};
        if (!App.Calendar.Events[String(year)]) App.Calendar.Events[String(year)] = {};
        if (!App.Calendar.Events[String(year)][String(weekId)]) App.Calendar.Events[String(year)][String(weekId)] = [];

        var calendarEvent = new _event(title, id, start, end, color, position, dimensions, defaults);

        App.Calendar.Events[String(year)][String(weekId)].push(calendarEvent);
    };

    var getEventById = function (id) {
        var week = App.Calendar.data.week,
            weekYear = week.currentYear,
            weekStart = week.start,
            weekEnd = week.end;
        
        var weekFormat = week.start + '-' + week.end;

        var events = App.Calendar.Events,
            eventsYear = events[String(weekYear)],
            eventsWeek = eventsYear[String(weekFormat)],
            event;

        $.each(eventsWeek, function (i, item) {
            if (item.id == id) {
                event = item;
                return;
            }
        });

       return event;
    };

    var deleteEventById = function (id) {
        var week = App.Calendar.data.week,
            weekYear = week.currentYear,
            weekStart = week.start,
            weekEnd = week.end;
        
        var weekFormat = week.start + '-' + week.end;

        var events = App.Calendar.Events,
            eventsYear = events[String(weekYear)],
            eventsWeek = eventsYear[String(weekFormat)],
            event;

        $.each(eventsWeek, function (i, item) {
            if (item.id == id) {
                event = i;
                return;
            }
        });

        return eventsWeek.splice(event, 1);
    }

    var updateEventById = function (data) {
        var week = App.Calendar.data.week,
            weekYear = week.currentYear,
            weekStart = week.start,
            weekEnd = week.end;
        
        var weekFormat = week.start + '-' + week.end;

        var events = App.Calendar.Events,
            eventsYear = events[String(weekYear)],
            eventsWeek = eventsYear[String(weekFormat)],
            event;

        $.each(eventsWeek, function (i, item) {
            if (item.id == data.id) {
                event = item;
                return;
            }
        });

        event.title = data.title;
        event.color = data.color;

        return event;
    }

    var current = function (state) {
        return {
            'week': function () {
                return currentWeek();
            }
        }[state]();
    };

    var resetState = function () {
        init();
    };

    function _capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return {
        set: set,
        init: init,
        current: current,
        addEvent: addEvent,
        resetState: resetState,
        getEventById: getEventById,
        updateEventById: updateEventById,
        deleteEventById: deleteEventById,
    };
})();