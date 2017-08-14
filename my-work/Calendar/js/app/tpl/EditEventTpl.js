'use strict';

var App = App || {};

App.Templates.EditEvent = _.template([
    '<div class="event_edit" style="top: <%= y %>; left: <%= x %>">',
        '<div class="event_header edit">',
            '<div class="event-title edit">',
                '<input class="event-title edit" placeholder="<%= event.title %>">',
            '</div>',
            '<img src="images/shape-close.png" class="close-sign">',
        '</div>',
        '<div class="event_when edit">',
            '<p>Когда</p>',
            '<p class="event_time"><%= event.start.startTime %>, <%= event.start.weekDay %>, <%= event.start.date %> г.</p>',
            '<% if (event.end != null) { %>',
                '<p class="event_time event_end"><%= event.end.endTime %>, <%= event.end.weekDay %>, <%= event.end.date %> г.</p>',
            '<% } %>',
        '</div>',
        '<div class="event_bottom-row">',
            '<button class="event_button-delete">Удалить</button>',
            '<button class="event_button-create">Сохранить</button>',
            '<ul class="event_colors edit">',
                '<li class="red" data-color="red-event"></li>',
                '<li class="yellow" data-color="yellow-event"></li>',
                '<li class="blue" data-color="blue-event"></li>',
                '<li class="green" data-color="green-event"></li>',
            '</ul>',
        '</div>',
    '</div>',
].join(''));