'use strict';

var Game = Game || {};

Game.Controller = (function() {
    var controls = Game.Controls,
        stats = Game.Stats,
        board = Game.Board;

    function init(config) {
        controls.init(config.controls, config.board.speed);
        stats.init(config.stats, config.board.size, config.board.speed);

        initSubscriptions();

        board.createCanvas(config.board);
    }

    function initSubscriptions() {
        Game.mediator.subscribe('Game: Start', startGame);
        Game.mediator.subscribe('Game: Pause', pauseGame);
        Game.mediator.subscribe('Game: Stop', stopGame);
        Game.mediator.subscribe('Game: Speed Changed', changeGameSpeed);
        Game.mediator.subscribe('Draw Mode: On', enableDrawMode);
        Game.mediator.subscribe('Draw Mode: Off', disableDrawMode);
        Game.mediator.subscribe('Stats: Alive Cells', showAliveCells);
        Game.mediator.subscribe('Stats: Generations', showGenerations);
    }

    function startGame() {
        board.startGame();
        stats.stateChanged('Running');
    }

    function pauseGame() {
        board.pauseGame();
        stats.stateChanged('Paused');
    }

    function stopGame() {
        board.stopGame();
        stats.stateChanged('Stopped');
    }

    function changeGameSpeed(speed) {
        board.setGameSpeed(speed);
        stats.showCurrentSpeed(speed);
    }

    function enableDrawMode() {
        var listener = board.listener();

        listener.enable();
        stats.drawModeStatus('On');
    }

    function disableDrawMode() {
        var listener = board.listener();

        listener.disable();
        stats.drawModeStatus('Off');
    }

    function showAliveCells(cells) {
        stats.showAliveCells(cells);
    }

    function showGenerations(data) {
        stats.showGenerations(data);
    }

    return {
        init: init
    };
})();