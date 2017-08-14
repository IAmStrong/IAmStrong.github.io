'use strict';

var App = App || {};

App.Views.Info = (function () {
    var calendar = App.Models.Calendar,
        tpl = {
            InfoTop: App.Templates.InfoTop,
            Info: App.Templates.Info
        },
        $el = {
            info: $('.container'),
            year: $('.wrapper')
        };

    var init = function (state) {
        var currentYear = App.Calendar.data.year.value;

        var states = {
            'week': function () {
                var currentWeek = App.Calendar.data.week,
                    info = currentWeek.start + ' - ' + currentWeek.end;

                var templateTop = tpl.InfoTop({'data': currentYear}),
                    template = tpl.Info({'data': info});

                $el.info.append(templateTop);
                $el.year.append(template);
            }
        };

        return states[state]();
    };

    var render = function (info) {
        var $containerTop = $('.container'),
            $container = $('.wrapper'),
            state = App.Calendar.state,
            states = {
                'week': function (info) {
                    var templateTop = tpl.InfoTop({'data': info.year}),
                        template = tpl.Info({'data': info.weekRange}),
                        $elTop = $('.header-info'),
                        $el = $('.info');

                    $el.remove();
                    $elTop.remove();
                    $container.append(template);
                    if ($('.header-info').length) $containerTop.append(templateTop);
                },
                'month': function (info) {
                    var templateTop = tpl.InfoTop({'data': info.year}),
                        template = tpl.Info({'data': info.month}),
                        $elTop = $('.header-info'),
                        $el = $('.info');

                    $el.remove();
                    $elTop.remove();
                    $container.append(template);
                    $containerTop.append(templateTop);
                },
                'year': function (info) {
                    var templateTop = tpl.InfoTop({'data': info}),
                        template = tpl.Info({'data': info}),
                        $elTop = $('.header-info'),
                        $el = $('.info');
                    
                    $el.remove();
                    $elTop.remove();
                    $container.append(template);
                    $containerTop.append(templateTop);
                }
            };

        return states[state](info);
    };

    return {
        init: init,
        render: render
    };
})();