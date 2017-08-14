'use strict';

var Game = Game || {};

Game.Board = (function() {
    var gameboard = {};

    function startGame() {
        gameboard.allowTimeChange = true;

        spawnNextGeneration();
        timer('set');
    }

    function pauseGame() {
        gameboard.allowTimeChange = false;

        timer('reset');
    }

    function stopGame() {
        var firstGeneration = gameboard.firstGeneration,
            generations = gameboard.generations = 0,
            context = gameboard.context,
            cells = gameboard.cells;

        pauseGame();

        iterate(cells, function(i) {
            cells[i].status = 'dead';
        });

        iterate(firstGeneration, function(i, item) {
            cells[item].status = 'alive';
        });

        gameboard.publish('aliveCells', firstGeneration.length);
        gameboard.publish('generations', generations);

        render(cells, context);
    }

    gameboard.publish = function(action, data) { // Publish game events
        var actions = {
            'aliveCells': function(data) {
                Game.mediator.publish('Stats: Alive Cells', data);
            },
            'generations': function(data) {
                Game.mediator.publish('Stats: Generations', data);
            }
        };

        return actions[action](data);
    }

    function createCanvas(config) { // Create canvas based on game settings
        var container = config.container,
            boardSize = config.size || 200,
            cellSize = config.cell.size || 2,
            borderSize = config.cell.borderSize,
            canvasSize = calculateCanvasSize(boardSize, cellSize, borderSize);

        var canvas = $('<canvas/>', {
                'id': 'gameboard'
            }).attr({
                'width': canvasSize + 'px',
                'height': canvasSize + 'px'
            });

        container.prepend(canvas);

        generateBoard(config, canvas, canvasSize);
    }

    function generateBoard(config, canvas, canvasSize) { // Generate canvas
        var context = canvas[0].getContext('2d'),
            speed = config.speed,
            boardSize = config.size,
            boardColor = config.color,
            cellSize = config.cell.size,
            rate = config.aliveCellsRate,
            cellColors = config.cell.color,
            borderSize = config.cell.borderSize;

        gameboard.context = context;
        gameboard.cellSize = cellSize;
        gameboard.size = boardSize;
        gameboard.canvas = canvas;
        gameboard.speed = speed;
        gameboard.borderSize = borderSize;

        refill(context, canvasSize, boardColor);
        generateCells(context, boardSize, cellSize, borderSize, cellColors, rate, speed);
    }

    function generateCells(context, boardSize, cellSize, borderSize, cellColors, rate, speed) { // First Generation
        var cells = [],
            cellIndex = 0,
            firstGeneration = gameboard.firstGeneration = [],
            generateAliveCell = function() {
                var totalBoardSize = boardSize * boardSize,
                    randomInt = generateRandomInt(1, totalBoardSize),
                    amount = (rate * totalBoardSize) / 100,
                    aliveCell = false;

                if (randomInt <= amount) aliveCell = true;

                return aliveCell;
            };

        Game.cellColors = cellColors;

        for (var i = 0; i < boardSize; ++i) {
            for (var j = 0; j < boardSize; ++j) {
                var cellStatus = generateAliveCell() ? 'alive' : 'dead',
                    posX = (cellSize + borderSize) * j + borderSize,
                    posY = (cellSize + borderSize) * i + borderSize,
                    x = j,
                    y = i;

                cells.push(new Game.Cell(posX, posY, cellSize, cellStatus, x, y));

                countAliveCells(cellStatus);
            }
        }

        function countAliveCells(cellStatus) {
            if (cellStatus === 'alive') firstGeneration.push(cellIndex);

            ++cellIndex;
        }

        gameboard.cells = cells;
        gameboard.generations = 0;
        gameboard.aliveCells = firstGeneration.length;

        gameboard.publish('generations', gameboard.generations);
        gameboard.publish('aliveCells', firstGeneration.length);

        render(cells, context);
    }

    function nextGeneration(cells, boardSize) { // Generate next generations
        var generation = {
            dies: [],
            revive: []
        }, length = cells.length;

        gameboard.aliveCells = 0;

        for (var i = 0; i < length; ++i) {
            var cell = cells[i],
                coords = cell.getCoords(),
                neighbors = getNeighbors(coords, boardSize), // Get neighbors indexes
                neighborsLength = neighbors.length,
                cellData = {
                    cell: cell,
                    status: cell.status,
                    aliveNeighbors: 0
                };

            for (var j = 0; j < neighborsLength; ++j) {
                var neighbor = neighbors[j],
                    currentStatus = cells[neighbor].status,
                    aliveNeighbor = currentStatus === 'alive';
                   
                if (aliveNeighbor) ++cellData.aliveNeighbors;
            }

            applyGameRules(cellData, generation);
        }

        iterate(generation.dies, function(i) {
            var cell = generation.dies[i];

            cell.status = 'dead';
        });

        iterate(generation.revive, function(i) {
            var cell = generation.revive[i];

            cell.status = 'alive';
        });

        ++gameboard.generations;

        gameboard.publish('generations', gameboard.generations);
    }

    function getNeighbors(coords, boardSize) {
        var neighborsAxisCoords = {
                x: [-1, -1, -1, 0, 0, 1, 1, 1],
                y: [-1, 0, 1, -1, 1, -1, 0, 1]
            },
            x = coords.x,
            y = coords.y;

        var length = neighborsAxisCoords.x.length

        for (var i = 0; i < length; ++i) {
            var offsetX = neighborsAxisCoords.x[i],
                offsetY = neighborsAxisCoords.y[i];

            neighborsAxisCoords.x[i] = offsetX + x;
            neighborsAxisCoords.y[i] = offsetY + y;
        }

        var neighborsCoords = [];

        for (var i = 0; i < length; ++i) {
            var xCoord = neighborsAxisCoords.x[i],
                yCoord = neighborsAxisCoords.y[i],
                xCoordExist = (xCoord >= 0) && (xCoord < boardSize),
                yCoordExist = (yCoord >= 0) && (yCoord < boardSize);

            if (xCoordExist && yCoordExist) {
                neighborsCoords.push({
                    x: xCoord,
                    y: yCoord
                });
            }
        }

        function getNeighborIndex(coords) {
            var indexes = coords.map(function(coord) {
                    return (coord.y * boardSize) + coord.x;
                });

            return indexes;
        }

        var neighborsIndexes = getNeighborIndex(neighborsCoords);

        return neighborsIndexes;
    }

    function applyGameRules(cellData, generation) {
        var rules = {
            dies: function(neighbors) {
                if (neighbors <= 1 || neighbors >= 4) return true;
            },
            revive: function(neighbors) {
                if (neighbors === 3) return true;
            }
        };

        var cell = cellData.cell,
            status = cellData.status,
            neighbors = cellData.aliveNeighbors,
            alive = status === 'alive',
            dies = rules.dies(neighbors),
            revive = rules.revive(neighbors);


        if (alive && dies) {
            generation.dies.push(cell);
        } else if (alive) {
            ++gameboard.aliveCells;
        }

        if (!alive && revive) {
            generation.revive.push(cell);
            ++gameboard.aliveCells;
        }
    }

    function spawnNextGeneration() {
        var context = gameboard.context,
            boardSize = gameboard.size,
            cells = gameboard.cells;

        nextGeneration(cells, boardSize);
        render(cells, context);

        gameboard.publish('aliveCells', gameboard.aliveCells);
    }

    function renderOne(action, cell) {
        var context = gameboard.context,
            cells = gameboard.cells,
            actions = {
                'alive': function() {
                    var currentCell = cells[cell],
                        isDead = currentCell.status === 'dead';

                    if (isDead) {
                        currentCell.status = 'alive';
                        ++gameboard.aliveCells;
                    }
                },
                'dead': function() {
                    var currentCell = cells[cell],
                        isAlive = currentCell.status === 'alive';

                    if (isAlive) {
                        currentCell.status = 'dead';
                        --gameboard.aliveCells;
                    }
                }
            };

        actions[action]();

        cells[cell].render(context);
        gameboard.publish('aliveCells', gameboard.aliveCells);
    }

    function timer(action) {
        var actions = {
            set: function() {
                gameboard.interval = setInterval(spawnNextGeneration, gameboard.speed);
            },
            reset: function() {
                clearInterval(gameboard.interval);
            }
        };
        
        return actions[action]();
    }

    function setGameSpeed(speed) {
        gameboard.speed = speed;

        timer('reset');

        if (gameboard.allowTimeChange) timer('set');
    }

    function listener() {
        return {
            enable: function() {
                gameboard.draw = [];

                gameboard.canvas.on('mousedown.drawEvent', function(e) {
                    var key = e.which,
                        leftClick = key === 1,
                        rightClick = key === 3;

                    if (leftClick) draw('add', e);
                    if (rightClick) draw('remove', e);

                    $(this).on('mousemove.drawEvent', function(e) {
                        if (leftClick) draw('add', e);
                        if (rightClick) draw('remove', e);
                    });
                }).on('mouseup.drawEvent', function() {
                    gameboard.draw = [];

                    gameboard.canvas.off('mousemove.drawEvent');
                }).on('contextmenu.drawEvent', function(e) {
                    e.preventDefault();
                }).addClass('active');
            },
            disable: function() {
                gameboard.canvas.off('.drawEvent').removeClass('active');
            }
        };
    } 

    function draw(action, e) {
        var borderSize = gameboard.borderSize,
            cellSize = gameboard.cellSize,
            boardSize = gameboard.size;

        var offsetX = e.offsetX,
            offsetY = e.offsetY;

        var x = findAxisCoordX(offsetX),
            y = findAxisCoordY(offsetY),
            cellIndex = (function(x, y) {
                return (y * boardSize) + x;
            })(x, y);

        var untouchedCell = gameboard.draw.every(function(item) {
            return item != cellIndex;
        });

        if (untouchedCell) {
            if (cellIndex > 0) {
                gameboard.draw.push(cellIndex);

                if (action === 'add') {
                    renderOne('alive', cellIndex);
                } else {
                    renderOne('dead', cellIndex);
                }
             }
         }

        function findAxisCoordX(offsetX) {
            return Math.ceil((offsetX - borderSize) / (cellSize +  borderSize)) - 1;
        }

        function findAxisCoordY(offsetY) {
            return Math.ceil((offsetY - borderSize) / (cellSize + borderSize)) - 1;
        }
    }

    /* Helper Functions */

    function generateRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function calculateCanvasSize(boardSize, cellSize, borderSize) {
        return boardSize * (cellSize + borderSize) + borderSize;
    }

    function iterate(data, callback) {
        var length = data.length;

        for (var i = 0; i < length; ++i) {
            callback(i, data[i]);
        }
    }

    function render(cells, context) {
        var length = cells.length;

        for (var i = 0; i < length; ++i) {
            cells[i].render(context);
        }
    }

    function refill(context, size, color) {
        context.fillStyle = color;
        context.fillRect(0, 0, size, size);
    }

    return {
        createCanvas: createCanvas,
        setGameSpeed: setGameSpeed,
        startGame: startGame,
        pauseGame: pauseGame,
        stopGame: stopGame,
        listener: listener
    };
})();