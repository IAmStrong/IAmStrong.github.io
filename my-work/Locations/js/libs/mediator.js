'use strict';

var App = App || {};

App.mediator = (function () {
    var channels = {};

    function subscribe(channel, subscription) {
        if (!channels[channel]) channels[channel] = [];
        channels[channel].push(subscription);
    }

    function publish(channel) {
        if (!channels[channel]) return;

        var args = [].slice.call(arguments, 1);

        for (var i = 0; i < channels[channel].length; i++) {
            channels[channel][i].apply(this, args);
        }
    }

    return {
        subscribe: subscribe,
        publish: publish
    }
})();