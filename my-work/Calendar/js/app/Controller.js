'use strict';

var App = App || {};

App.Controller = (function () {
    var mediator = App.mediator,
        _calendar;

    var init = function () { // initialize the controller
        var calendarView = App.Views.Calendar,
            calendar = App.Models.Calendar,
            state = App.Calendar.state,
            infoView = App.Views.Info;

         _initSubscriptions();

        calendar.init();
        calendarView.render(state);
        infoView.init(state);

        _calendar = calendar;
    };

    var _initSubscriptions = function () { // initialize mediator's subscriptions
        mediator.subscribe('Week: Change', _showInfo);
        mediator.subscribe('Month: Change', _showInfo);
        mediator.subscribe('Year: Change', _showInfo);
        mediator.subscribe('New Event: Modal', _showModal);
        mediator.subscribe('New Event: Close', _reInit);
        mediator.subscribe('New Event: Add', _addEvent);
        mediator.subscribe('New Event: Edit', _updateEvent);
        mediator.subscribe('New Event: Delete', _deleteEvent);
        mediator.subscribe('Events: Show Week', _showEvents);
        mediator.subscribe('Event: Edit', _editEvent);
        mediator.subscribe('Event: Edit Close', _reInit);
    };

    var _showInfo = function (info) {
        var infoView = App.Views.Info;

        infoView.render(info);
    };

    var _showModal = function (data, position) {
        var eventView = App.Views.Event;

        eventView.showModal(data, position);
    };

    var _reInit = function () {
        var weekView = App.Views.Week;

        weekView.loadListeners();
    };

    var _addEvent = function (event) {
        var events = App.Calendar.Events;

        _calendar.addEvent(event);
        System.saveToLocalStorage(events);

        _reInit();
    };

    var _showEvents = function (week) {
        var eventView = App.Views.Event;

        eventView.render(week);
    };

    var _updateEvent = function (data) {
        var eventView = App.Views.Event,
            event = _calendar.updateEventById(data),
            events = App.Calendar.Events;

        eventView.renderOne(event);
        System.saveToLocalStorage(events);

        _reInit();
    };

    var _deleteEvent = function (id) {
        var events = App.Calendar.Events;

        _calendar.deleteEventById(id);
        System.saveToLocalStorage(events);

        _reInit();
    };

    var _editEvent = function (id, mouseCoords) {
        var eventView = App.Views.Event;

        eventView.editEvent(id, mouseCoords);
    };

    return {
        init: init
    };
})();