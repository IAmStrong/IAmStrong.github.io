'use strict';

var App = App || {};

App.Location = (function () {
    var num = 0;

    function Location(obj) {
        var name = obj.name,
            groups = obj.groups,
            teachers = obj.teachers,
            id = preventWhitespace(name).toLowerCase() + '_' + (++num);

        this.get = function () {
            return {
                name: name,
                groups: groups,
                teachers: teachers,
                id: id
            };
        };
        
        this.update = function(obj) {
            name = obj.name;
            groups = obj.groups;
            teachers = obj.teachers;
        };
    }
    
    function preventWhitespace(name) { // Prevent location's name with whitespace, e.g. 'New York'.
        if (/\s/.test(name)) {
            return name.replace(/\s+/g, '');
        } else {
            return name;
        }
    }

    return Location;
})();