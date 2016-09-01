'use strict';

var App = App || {};

loadJSON(function(response) { // Load locations.json.
    var jsonResponse = JSON.parse(response);

    App.data = jsonResponse;
});

function start () { // Application Entry Point.
    var controller = new App.Controller();

    controller.init(); // Run the controller
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'js/db/locations.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

document.addEventListener('DOMContentLoaded', start, false);