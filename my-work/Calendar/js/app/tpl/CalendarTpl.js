'use strict';

var App = App || {};

App.Templates.Calendar = _.template([
    '<div class="nav-container">',
        '<div class="pagination">',
            '<button class="prev" data-nav="prev"></button>',
            '<button class="next" data-nav="next"></button>',
        '</div>',
        '<nav class="main-navigation">',
            '<ul>',
                '<li><button class="navigation_top-right button-week active" data-state="week">Неделя</button></li>',
                '<li><button class="navigation_top-right button-month" data-state="month">Месяц</button></li>',
                '<li><button class="navigation_top-right button-year" data-state="year">Год</button></li>',
            '</ul>',
        '</nav>',
    '</div>',
    '<div class="calendar"></div>'
].join(''));