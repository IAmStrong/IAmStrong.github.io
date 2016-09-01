'use strict';

var App = App || {};

App.loadData = (function () {
    loadJSON(function(response) {
        var jsonResponse = JSON.parse(response);

        App.data = jsonResponse;
    });

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
})();