'use strict';

var Game = Game || {};

Game.Controls = (function() {
    var buttons = {};

    function init(controls, speed) {
        buttons.state = {
            start: controls.state.start,
            pause: controls.state.pause,
            stop: controls.state.stop
        };

        buttons.speed = {
            range: controls.speed.range
        };

        buttons.mode = {
            draw: controls.mode.draw
        };

        buttons.state.start.on('click', changeState);
        buttons.state.pause.on('click', changeState);
        buttons.state.stop.on('click', changeState);

        buttons.speed.range.on('input', changeSpeed);

        buttons.mode.draw.on('click', toggleDrawMode);

        setRangeValue(speed);
    }

    function changeState() {
        var current = $(this),
            drawButton = buttons.mode.draw,
            isActive = current.attr('disabled'),
            drawButtonActive = drawButton.hasClass('active'),
            currentAction = $(this).attr('data-control-action');

        if (!isActive) {
            $.each(buttons.state, function(key, button) {
                var disabled = button.attr('disabled');

                if (disabled) button.attr('disabled', false);
            });

            current.attr('disabled', true);

            if (currentAction === 'Start' && drawButtonActive) disableDrawMode();

            Game.mediator.publish('Game: ' + currentAction);
        }
    }

    function changeSpeed() {
        var current = $(this),
            currentSpeed = $(this).val();

        Game.mediator.publish('Game: Speed Changed', currentSpeed);
    }

    function setRangeValue(speed) {
        var range = buttons.speed.range;

        range.val(speed);
    }

    function toggleDrawMode() {
        var current = $(this),
            status = 'Off';

        current.toggleClass('active');

        var drawModeActivated = current.hasClass('active');

        if (drawModeActivated) status = 'On';

        Game.mediator.publish('Draw Mode: ' + status);

        var startButton = buttons.state.start,
            pauseButton = buttons.state.pause,
            startButtonActive = startButton.attr('disabled');

        if (startButtonActive) {
            startButton.attr('disabled', false);
            pauseButton.attr('disabled', true);

            Game.mediator.publish('Game: Pause');
        }
    }

    function disableDrawMode() {
        var button = buttons.mode.draw;

        button.removeClass('active');
        Game.mediator.publish('Draw Mode: Off');
    }

    return {
        init: init
    };
})();