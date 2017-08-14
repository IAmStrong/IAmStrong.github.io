'use strict';

var App = App || {};

App.Views.Event = (function () {
    var tpl = App.Templates.AddEvent,
        mediator = App.mediator;

    var render = function (week) {
        var eventTpl = App.Templates.Event;

        $.each(week, function (i, item) {
            var height = item.dimensions.height || item.defaults.height,
                width = item.dimensions.width || item.defaults.width,
                posY = item.position.y,
                posX = item.position.x,
                color = item.color,
                id = item.id

            var $el = $('.table-wrapper_event');

            var $eventElement = $('<div/>', {
                'class': 'week-event ' + color,
                'data-id': id
            }).css({
                'top': posY + 'px',
                'left': posX + 'px',
                'width': width,
                'height': height
            });

            _attachListener($eventElement);

            $el.append($eventElement);

            var data = _.extend({'eventTitle': item.title}, item),
                template = eventTpl(data);

            $eventElement.html(template);
        });
    };

    var renderOne = function (event) {
        var $eventContainer = $('*[data-id="' + event.id + '"]');

            var $classList = $eventContainer.attr('class').split(' '),
                color = event.color;

            if ($classList[1] != color) {
                $eventContainer.removeClass($classList[1]);
                $eventContainer.addClass(color);
            }

            var eventTpl = App.Templates.Event,
                data = _.extend({'eventTitle': event.title}, event),
                template = eventTpl(data);

            $eventContainer.html(template);
    };

    var showModal = function (event, position) {
        var $el = $('.event-info_container'),
            data = _.extend({
                'start': event.start,
                'position': position,
                'end': event.end || event.start
            }),
            template = tpl({
                data: data
            });

            $el.html(template);

            var eventInput = $('.event-name_input');

            eventInput.focus();

            _loadListeners(event);
    };

    var _loadListeners = function (event) {
        var $eventDrag = $('*[data-id="' + event.id + '"]'),
            $button = $('.event_button-create'),
            $colors = $('.event_colors li'),
            $closePupup = $('.close-sign'),
            $popup = $('.event_info');

        $closePupup.on('click.addEvent', function () {
            $eventDrag.remove();
            $popup.remove();
      
            mediator.publish('New Event: Close');
        });

        $button.on('click.addEvent', function () {
            var tpl = App.Templates.Event,
                defaultColor = 'blue-event',
                $input = $('.event-name_input'),
                title = $input.val() || 'Без названия';

            $popup.remove();

            $eventDrag.removeClass('preview');
            $eventDrag.addClass(event.color || defaultColor);

            var data = _.extend({'eventTitle': title}, event),
                template = tpl(data);

            event.title = title;

            mediator.publish('New Event: Add', event);

            _attachListener($eventDrag);

            $eventDrag.html(template);

            event.color = defaultColor;
        });

        $colors.on('click.addEvent', function () {
            var $classList = $eventDrag.attr('class').split(' '),
                $color = $(this).data('color');

            if ($classList[2] != $color) $eventDrag.removeClass($classList[2]);

            event.color = $color;
            $eventDrag.addClass($color);
        });
    };

    var _attachListener = function (item) {
        return item.on('contextmenu', function(e) {
            e.preventDefault();

            var $el = $('.table-wrapper_event'),
                id = $(this).attr('data-id'),
                mouseCoords = {
                    x: e.pageX - $el.offset().left + 10 + 'px',
                    y: e.pageY - $el.offset().top + 10 + 'px'
                };

            mediator.publish('Event: Edit', id, mouseCoords);
        });
    };

    var editEvent = function (id, mouseCoords) {
        var $el = $('.event-info_container'),
            tpl = App.Templates.EditEvent,
            calendar = App.Models.Calendar,
            event = calendar.getEventById(id);

        var board = $('.table-wrapper_event');

        board.off('.drawEvent');

        var data = _.extend({'event': event}, mouseCoords),
            template = tpl(data);

        $el.html(template);

        var eventInput = $('.event-title.edit');
        eventInput.focus();

        _loadEditListeners(id, event);
    };

    var _loadEditListeners = function (id, event) {
        var $button = $('.event_button-create'),
            $delete = $('.event_button-delete'),
            $colors = $('.event_colors li'),
            $closePupup = $('.close-sign'),
            $popup = $('.event_edit');

        $closePupup.on('click.editEvent', function () {
            $popup.remove();
            mediator.publish('Event: Edit Close');
        });

        $button.on('click.editEvent', function () {
            var $color = $('.event_colors li.selected').data('color'),
                $input = $('.event-title.edit input'),
                title = $input.val(),
                data = {
                    'id': id,
                    'title': title || event.title,
                    'color': $color || event.color
                };

            $popup.remove();

            mediator.publish('New Event: Edit', data);
        });

        $colors.on('click.editEvent', function () {
            var $color = $(this).data('color'),
                isActive = $(this).hasClass('selected');

            if (!isActive) {
                $.each($colors, function(i, button) {
                    var selected = $(button).hasClass('selected');

                    if (selected) $(button).removeClass('selected');
                });

                $(this).addClass('selected');
            }
        });

        $delete.on('click.editEvent', function () {
            var selectedEvent = $('*[data-id="' + id + '"]');

            selectedEvent.remove();
            $popup.remove();

            mediator.publish('New Event: Delete', id);
        });
    };

    return {
        showModal: showModal,
        editEvent: editEvent,
        renderOne: renderOne,
        render: render
    };
})();