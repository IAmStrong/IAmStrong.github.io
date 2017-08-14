'use strict';

var Game = Game || {};

Game.Cell = (function () {
    function Cell(posX, posY, size, status, x, y) {
        var _posX = posX,
            _posY = posY,
            _size = size,
            _y = y,
            _x = x;

        this.status = status;

        this.render = function(context) {
            var color = this.setColor();

            context.fillStyle = color;
            context.fillRect(_posX, _posY, _size, _size);
        }

        this.getCoords = function() {
            return {
                x: _x,
                y: _y
            };
        }

        return this;
    }

    Cell.prototype.setColor = function() {
        var colorAlive = Game.cellColors.alive,
            colorDead = Game.cellColors.dead,
            color = colorDead;

        if (this.status === 'alive') color = colorAlive;
        
        return color;
    }

    return Cell;
})();