'use strict';

var Game = Game || {};

function ready() {
    var controller = Game.Controller,
        config = {
            board: {
                container: $('#game'),
                color: 'rgb(127, 140, 141)',
                size: 200,                     // NxN blocks
                speed: 500,                    // ms
                aliveCellsRate: 10,            // %
                cell: {
                    size: 3,                   // px
                    borderSize: 0,             // px; 1 to show grid; 0 to disable
                    color: {
                        alive: 'rgb(127, 140, 141)',
                        dead: 'rgb(250, 255, 255)'
                    }
                }
            },
            controls: {
                state: {
                    start: $('#start'),
                    pause: $('#pause'),
                    stop: $('#stop')
                },
                speed: {
                    range: $('#speed-range')
                },
                mode: {
                    draw: $('#draw-mode')
                }
            },
            stats: {
                state: $('#state'),
                speed: $('#speed'),
                size: $('#size'),
                cells: $('#cells'),
                draw: $('#draw'),
                alive: $('#alive'),
                generations: $('#generations')
            }
        };

    controller.init(config); // Game's controller initialization
}

$(ready);