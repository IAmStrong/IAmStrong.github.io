'use strict';

var App = App || {};

var System = (function () {
    var register = function (parent, modules) {
        modules.forEach(function (module) {
            parent[module] = {};
        });
    };

    var saveToLocalStorage = function (data) {
        return localStorage.setItem('calendar-event', JSON.stringify(data));
    };

    var getFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem('calendar-event'));
    };

    return {
        getFromLocalStorage: getFromLocalStorage,
        saveToLocalStorage: saveToLocalStorage,
        register: register
    };
})();