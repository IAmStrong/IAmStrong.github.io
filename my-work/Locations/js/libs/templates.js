'use strict';

var App = App || {};

App.templates = (function () {
    function locationsTpl () {
        var tpl = _.template([
            '<h1>Locations</h1>',
            '<div id="main">',
                '<div class="container"></div>',
                '<button class="add">+ Add Location</button>',
            '</div>',
            '<div class="popup animated fadeIn"></div>',
            '<menu class="context-menu">',
                '<button class="btn_edit">Edit...</button>',
                '<button class="btn_remove">Remove</button>',
            '</menu>'
        ].join(''));

        return tpl;
    }

    function locationTpl () {
        var tpl = _.template([
            '<h2><%= name %></h2>',
            '<span>Groups</span>',
            '<p><%= groups %></p>',
            '<span>Teachers</span>',
            '<p><%= teachers %></p>',
        ].join(''));

        return tpl;
    }

    function createEditTpl(action) {
        var tpl = {
            add: _.template([
                '<div class="add_place animated bounceInDown">',
                    '<button class="close"></button>',
                    '<h3>Add a new location</h3>',
                    '<span>Location</span>',
                    '<input type="text" id="location" placeholder="Place">',
                    '<span>Groups</span>',
                    '<input type="number" id="groups" min="1" max="99" placeholder="Number">',
                    '<span>Teachers</span>',
                    '<input type="number" id="teachers" min="1" max="99" placeholder="Number">',
                    '<button class="submit">Submit</button>',
                '</div>',
            ].join('')),
            edit: _.template([
                '<div class="edit_place animated flipInX">',
                    '<button class="close"></button>',
                    '<h3>Edit location</h3>',
                    '<span>Location</span>',
                    '<input type="text" id="location" value="<%= name %>">',
                    '<span>Groups</span>',
                    '<input type="number" id="groups" min="1" max="99" value="<%= groups %>">',
                    '<span>Teachers</span>',
                    '<input type="number" id="teachers" min="1" max="99" value="<%= teachers %>">',
                    '<button class="submit">Submit</button>',
                '</div>',
            ].join(''))
        };

        return tpl[action];
    }

    function tipTpl () {
        var tpl = _.template([
            '<div class="tip left">',
                '<div class="arrow"></div>',
                '<h3 class="title">Tip</h3>',
                '<div class="content">Right click on a location</br> ',
                'to show menu.</div>',
            '</div>',
        ].join(''));

        return tpl;
    }

    return {
        locationsTpl: locationsTpl,
        locationTpl: locationTpl,
        createEditTpl: createEditTpl,
        tipTpl: tipTpl
    };
})();