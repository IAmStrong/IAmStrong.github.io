'use strict';

var Game = Game || {};

Game.Stats = (function() {
    var views = {};

    function init(elements, boardSize, speed) {
        views.generations = elements.generations;
        views.currentState = elements.state;
        views.currentSpeed = elements.speed;
        views.cellCount = elements.cells;
        views.size = elements.size;
        views.draw = elements.draw;
        views.alive = elements.alive;

        stateChanged('First Generation');
        showGameboardSize(boardSize);
        showCellCount(boardSize);
        showCurrentSpeed(speed);
        drawModeStatus('Off');
    }

    function stateChanged(state) {
        views.currentState.html(state);
    }

    function showCurrentSpeed(speed) {
        views.currentSpeed.html(speed + 'ms');
    }

    function showGameboardSize(size) {
        var gameboardSize = size + 'x' + size;

        views.size.html(gameboardSize);
    }

    function showCellCount(cells) {
        var count = cells * cells;

        views.cellCount.html(count);
    }

    function showAliveCells(cells) {
        views.alive.html(cells);
    }

    function drawModeStatus(drawModeStatus) {
        views.draw.html(drawModeStatus);
    }

    function showGenerations(data) {
        views.generations.html(data);
    }

    return {
        init: init,
        stateChanged: stateChanged,
        showAliveCells: showAliveCells,
        drawModeStatus: drawModeStatus,
        showGenerations: showGenerations,
        showCurrentSpeed: showCurrentSpeed
    };
})();