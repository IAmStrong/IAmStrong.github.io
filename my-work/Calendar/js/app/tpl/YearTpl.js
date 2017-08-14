'use strict';

var App = App || {};

App.Templates.Year = _.template([
    '<% var months = [\'Январь\', \'Февраль\', \'Март\', \'Апрель\', \'Май\', \'Июнь\', \'Июль\', \'Август\', \'Сентябрь\', \'Октябрь\', \'Ноябрь\', \'Декабрь\']; %>',
    '<% var days = [\'Понедельник\', \'Вторник\', \'Среда\', \'Четверг\', \'Пятница\', \'Суббота\', \'Воскресенье\']; %>',
    '<% var begin, j; %>',
    '<% var daysCount = 42; %>',
    '<div class="year">',
    '<% _.each(months, function (item) { %>',
        '<% j = 0 %>',
        '<% for (var i = 0; i < days.length; i++) { %>',
            '<% if (data[item].startOf === days[i]) { %>',
                '<% begin = i; %>',
                '<% break; %>',
            '<% } %>',
        '<% } %>',
        '<div class="year_month-container">',
            '<div class="year_month-header"><%= item %></div>',
            '<div class="year_month-week-days">',
                '<div class="year_month-day">П</div>',
                '<div class="year_month-day">В</div>',
                '<div class="year_month-day">С</div>',
                '<div class="year_month-day">Ч</div>',
                '<div class="year_month-day">П</div>',
                '<div class="year_month-day">С</div>',
                '<div class="year_month-day">В</div>',
            '</div>',
            '<div class="year_days-container">',
            '<% for (var i = 0; i < daysCount; i++) { %>',
                '<% var dayCount = i >= begin ? j + 1 : 0; %>',
                '<% var todayYear = data.today.year; %>',
                '<% var currentMonth = data.today.monthName === item; %>',
                '<% var currentYear = data.currentYear === todayYear; %>',
                '<% var currentDay = Number(data.today.day) === dayCount; %>',
                '<div class="year_day <% if (currentMonth && currentDay && currentYear) { %>current<% } %>">',
                    '<% if (i >= begin && j < data[item].days) { %>',
                        '<%= i - begin + 1  %>',
                        '<% j++; %>',
                    '<% } %>',
                '</div>',
            '<% } %>',
            '</div>',
        '</div>',
    '<% }); %>',
    '</div>'
].join(''));