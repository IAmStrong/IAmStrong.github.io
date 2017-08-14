'use strict';

var App = App || {};

App.Templates.Event = _.template([
    '<div class="event_container">',
        '<p class="event-text"><%= start.startTime %> - <%= end ? end.endTime : start.endTime %></p>',
        '<p class="event_heading event-text"><%= eventTitle %></p>',
    '</div>',
].join(''));