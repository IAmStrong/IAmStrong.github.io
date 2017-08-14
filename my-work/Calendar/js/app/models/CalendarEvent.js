'use strict';

var App = App || {};

App.Models.CalendarEvent = (function () {
    function CalendarEvent (title, id, start, end, color, position, dimensions, defaults) {
        this.title = title;
        this.id = id;
        this.start = start;
        this.end = end;
        this.color = color || 'blue-event';
        this.position = position;
        this.dimensions = dimensions;
        this.defaults = defaults;

        return this;
    }

    return CalendarEvent;
})();