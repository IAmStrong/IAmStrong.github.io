'use strict';

var App = App || {};

App.Views.Week = (function () {
    var calendar = App.Models.Calendar,
        tpl = App.Templates.Week,
        mediator = App.mediator,
        _eventData = {};

    var render = function () {
        var $el = $('.calendar'),
            now = {
                month: App.Calendar.data.month.value,
                year: App.Calendar.data.year.value,
                day: App.Calendar.data.day
            },
            weekDays = App.Calendar.data.week.details,
            data = _.extend({'currentDay': now}, weekDays),
            template = tpl(data);

        $el.html(template);

        if (App.Calendar.Events) _checkEvents();

        loadListeners();
    };

    var loadListeners = function () {
        var $cellHeight = $('.cell').outerHeight(),
            $cellWidth = $('.cell').outerWidth(),
            $el = $('.table-wrapper_event'),
            BORDER_SIZE = 1,
            coords = {};

        $el.on('mousedown.drawEvent', function (e) {
            if ($(e.target).hasClass('cell')) {
                var $area = $(this),
                    data = $(e.target).data('calendar'),
                    position = _getCoords(e, $area),
                    id = moment().valueOf(),
                    start = {};

                coords.x = [];
                coords.y = [];

                var $eventElement = $('<div/>', {
                        'class': 'week-event preview',
                        'data-id': id
                    }).css({
                        'top': position.y + 'px',
                        'left': position.x + 'px'
                    });

                start.x = position.x;
                start.y = position.y;

                _eventData.id = id;
                _eventData.start = data;
                _eventData.end = {};
                _eventData.dimensions = {};
                _eventData.defaults = {
                    'height': $cellHeight,
                    'width': $cellWidth
                };

                $el.append($eventElement);

                $eventElement.html(data.startTime);

                $(this).on('mousemove.drawEvent', function (e) {
                    var position = _getCoords(e, $area),
                        xExist = _contains(coords.x, position.x, start.x),
                        yExist = _contains(coords.y, position.y, start.y);

                    if (!xExist) {
                        coords.x.push(position.x);
                        _eventData.end.x = position.x;

                        var width = ($cellWidth + BORDER_SIZE) * coords.x.length;
                        _eventData.dimensions.width = width;

                        $eventElement.css({
                            'width': width + 'px'
                        });
                    }

                    if (!yExist) {
                        coords.y.push(position.y);
                        _eventData.end.y = position.y;

                        var height = $cellHeight * coords.y.length;
                        _eventData.dimensions.height = height;

                        $eventElement.css({
                            'height': height  + 'px'
                        });
                    }
                }).on('mouseup.drawEvent', function (e) {
                    var mouseCoords = {
                        x: e.pageX - $(this).offset().left + 'px',
                        y: e.pageY - $(this).offset().top + 'px'
                    },
                    recoverValues = _recover(coords, $cellHeight);

                    _eventData.end.y = recoverValues;

                    var lastItemData = _lastItemData(_eventData.end, $cellHeight, $cellWidth, BORDER_SIZE);

                    _eventData.end = lastItemData;
                    _eventData.position = start;

                    mediator.publish('New Event: Modal', _eventData, mouseCoords);

                    $(this).off('.drawEvent');
                });
            }
        });

        function _recover (data, height) {
            var y = data.y;

            return ((y.length - 1) * height) + y[0];
        }

        function _lastItemData (coords, height, width, bordersize) {
            var $items = $('.cell'),
                posX = coords.x,
                posY = coords.y,
                DAYS = 7;

            var y = posY / height,
                x = posX / (width + bordersize),
                result = (y * DAYS) + x,
                data = $($items[result]).data('calendar');

            return data;
        }

        function _getCoords (e, area) {
            var x = e.pageX - area.offset().left,
                y = e.pageY - area.offset().top,
                calcCoords = (function(x, y) {
                    var _x = Math.ceil((x / ($cellWidth + BORDER_SIZE)) - BORDER_SIZE) * ($cellWidth + BORDER_SIZE),
                        _y = (Math.ceil((y / $cellHeight) - BORDER_SIZE) * $cellHeight);
                    return {
                        x: _x < 0 ? 0 : Math.abs(_x),
                        y: _y < 0 ? 0 : Math.abs(_y)
                    };
            })(x, y);
            return calcCoords;
        }

        function _contains (arr, pos, startPos) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === pos || pos < startPos) {
                    return true;
                }
            }

            return false;
        }
    }

    var _checkEvents = function () {
        var week = App.Calendar.data.week,
            weekYear = week.currentYear,
            weekStart = week.start,
            weekEnd = week.end;
        
        var weekFormat = week.start + '-' + week.end;

        var events = App.Calendar.Events,
            eventsYear,
            eventsWeek;

        if (events[String(weekYear)]) eventsYear = events[String(weekYear)];
        if (eventsYear) eventsWeek = eventsYear[String(weekFormat)];

        if (eventsYear && eventsWeek) mediator.publish('Events: Show Week', eventsWeek);
    }

    return {
        loadListeners: loadListeners,
        render: render
    };
})();