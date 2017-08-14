'use strict';

var App = App || {};

App.Templates.AddEvent = _.template([
    '<div class="event_info" style="top: <%= data.position.y %>; left: <%= data.position.x %>">',
        '<div class="event_header">',
            '<div class="event-title">',
                'Новое событие',
            '</div>',
            '<img src="images/shape-close.png" class="close-sign">',
        '</div>',
        '<input class="event-name_input" type="text" maxlength="40" placeholder="Название события" autofocus>',
        '<div class="event_when">',
            '<p>Когда</p>',
            '<p class="event_time"><%= data.start.startTime %>, <%= data.start.weekDay %>, <%= data.start.date %> г.</p>',
            '<% if (data.end != null) { %>',
                '<p class="event_time event_end"><%= data.end.endTime %>, <%= data.end.weekDay %>, <%= data.end.date %> г.</p>',
            '<% } %>',
        '</div>',
        '<div class="event_bottom-row">',
            '<ul class="event_colors">',
                '<li class="red" data-color="red-event"></li>',
                '<li class="yellow" data-color="yellow-event"></li>',
                '<li class="blue" data-color="blue-event"></li>',
                '<li class="green" data-color="green-event"></li>',
            '</ul>',
            '<button class="event_button-create">Создать</button>',
        '</div>',
    '</div>',
].join(''));