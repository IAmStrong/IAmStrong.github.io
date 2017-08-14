'use strict';

var App = App || {}; // Defining our application's scope

System.register(App, ['Views', 'Models', 'Templates', 'Calendar']); // Registering application's modules
System.register(App.Calendar, ['Events']);

$(function () {
    var controller = App.Controller;

    var eventsNotExist = $.isEmptyObject(App.Calendar.Events);

    if (eventsNotExist) App.Calendar.Events = System.getFromLocalStorage(); // Retrieve previously stored data

    App.Calendar.state = 'week'; // Default calendar's screen

    controller.init(); // Run the controller
});