'use strict';

var App = App || {};

function start () { // Application Entry Point.
    var controller = new App.Controller();

    controller.init();
}

document.addEventListener('DOMContentLoaded', start, false);