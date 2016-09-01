'use strict';

var app = {};

// Adding elements to the HTML DOM, canvas creation, adding event handlers

app.generate = function () {
    var main = document.getElementsByClassName('container')[0],
        info = document.getElementsByClassName('info')[0],
        canvas = document.createElement('canvas'),
        div = document.createElement('div'),
        h1 = document.createElement('h1');

    h1.appendChild(document.createTextNode('Clock'));
    canvas.id = 'canvas';
    canvas.width = 600;
    canvas.height = 200;
    div.className = 'clock';
    main.insertBefore(h1, info);
    main.appendChild(div);
    div.appendChild(canvas);

    app.ctx = canvas.getContext('2d');

    app.ctx.font = 'bold 100px Arial';
    app.ctx.textBaseline = 'middle';
    app.ctx.textAlign = 'center';
    app.ctx.fillStyle = 'rgba(242, 242, 242, 0.9)';
    app.ctx.lineWidth = 17;

    canvas.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    }, false);

    canvas.addEventListener('mousedown', function(event) {
        if (event.button === 2) {
            app.view('mmDDyy');
        }
        else if (event.button === 0) {
            if (app.format === 'hhMM') {
                app.view('hhMMss');
            } else {
                app.view('hhMM');
            }
        }
        app.hint.update();
    }, false);

    app.view('hhMM');
    app.hint.run();
};

// App view: canvas drawing

app.view = function(format) {
    var now = app.getTime();

    var hours = 100 / 24 * now.hours,
        min = 100 / 60 * now.minutes,
        sec = 100 / 60 * now.seconds,
        month = 100 / 12 * now.month,
        year = app.checkYearLength(now.year),
        day = app.checkMonthLength(now);

    app.ctx.clearRect(0, 0, canvas.width, canvas.height);
    app.format = format;
    
    var timeFormats = {
		'hhMMss': function () {
            app.draw(125, 100, hours, now.hours, 'rgba(52, 152, 219, 0.6)');
            app.draw(305, 100, min, now.minutes, 'rgba(46, 204, 113, 0.4)');
            app.draw(485, 100, sec, now.seconds, 'rgba(231, 76, 60, 0.2)');
		},
        'mmDDyy': function () {
            app.draw(125, 100, month, now.month, 'rgba(52, 152, 219, 0.6)');
            app.draw(305, 100, day, now.day, 'rgba(46, 204, 113, 0.4)');
            app.draw(485, 100, year, now.year, 'rgba(231, 76, 60, 0.2)');
        },
        'hhMM': function () {
            app.draw(220, 100, hours, now.hours, 'rgba(52, 152, 219, 0.6)');
            app.draw(400, 100, min, now.minutes, 'rgba(46, 204, 113, 0.4)');
        }
    };
    
    return (timeFormats[format])();
};

app.updateView = (function () {
    function viewTime () {
        var format = app.format;

        return app.view(format);
    }

    setInterval(viewTime, 500);
})();

// Hint messages

app.hint = {
    run: function () {
        var el = document.getElementsByClassName('toggle');

        this.span = document.getElementsByTagName('span')[2];
        this.rightHint = el[1];
        this.leftHint = el[0];

        this.toggle = {
            leftClick: function (type) {
                return {
                    'hhMM': ' to show seconds. ',
                    'hhMMss': ' to hide seconds. ',
                    'mmDDyy': ' to hide date. '
                }[type];
            },
            rightClick: function () {
                this.span.classList.add('disabled');
                this.rightHint.classList.add('disabled');
            }.bind(this)
        };
    },
    update: function () {
        var type = app.format;

        this.rightHint.classList.remove('disabled');
        this.span.classList.remove('disabled');

        this.leftHint.innerHTML = this.toggle.leftClick(type);
        if (type === 'mmDDyy') this.toggle.rightClick();

        this.animate();
    },
    animate: function () {
        var info = document.getElementsByClassName('info')[0];
        
        info.classList.add('animate');
        
        function animateOnChange () {
            info.classList.remove('animate');
        }
        
        setTimeout(animateOnChange, 400);

        //info width, logo?, click delay?, CHECK SCRIPTS
    }
};

// Special functions

app.getTime = function () {
    var now = new Date();
    
    function addZero(i) {
        return (i < 10) ? '0' + i : i;
    }
    
    function shortenYear(i) {
        return i.toString().substr(2);
    }
    
    return {
        hours: addZero(now.getHours()),
        minutes: addZero(now.getMinutes()),
        seconds: addZero(now.getSeconds()),
        day: addZero(now.getDate()),
        year: shortenYear(now.getFullYear()),
        month: addZero(now.getMonth() + 1),
        date: now
    };
};

app.draw = (function () {
    var start = 1.5 * Math.PI,
        end = (2 * Math.PI) / 100;
    
    return function(x, y, p, text, color) {
        p = p || 100;
        app.ctx.strokeStyle = color;
        app.ctx.beginPath();
        app.ctx.fillText(text, x, y);
        app.ctx.arc(x, y, 75, start, p * end + start, false);
        app.ctx.stroke();
    };
})();

// A set of helpers

app.checkMonthLength = function(now) {
    if (now.month % 2 === 0 && now.month != '02') {
        return 100 / 30 * now.day;
    }
    else if (now.month === '02') {
        if (isLeap(now.year)) {
            return 100 / 29 * now.day;
        } else {
            return 100 / 28 * now.day;
        }
    } else {
        return 100 / 31 * now.day;
    }
};

app.checkYearLength = function(year) {
    var leap = 100 / 366 * app.countCurrentDay(),
        notLeap = 100 / 355 * app.countCurrentDay();
    
    return app.isLeap(year) ? leap : notLeap;
};

app.countCurrentDay = function () {
    var today = new Date(),
        firstDay = new Date(today.getFullYear(), 0, 1),
        currentDayNumber = Math.round(((today - firstDay) / 1000 / 60 / 60 / 24) + 0.5, 0);

    return currentDayNumber;
};

app.isLeap = function(year) {
    return ((year % 4 === 0) && (year % 100 != 0)) || (year % 400 === 0);
};

// App activity start

document.addEventListener('DOMContentLoaded', ready);

function ready () {
    app.generate();
}