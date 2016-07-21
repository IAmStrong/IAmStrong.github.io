document.addEventListener('DOMContentLoaded', generator);

function generator () {
    var bottomValue = document.getElementsByClassName('bottom')[0],
        rightValue = document.getElementsByClassName('right')[0],
        leftValue = document.getElementsByClassName('left')[0],
        topValue = document.getElementsByClassName('top')[0];

    var bottomInput = document.getElementById('bottom'),
        rightInput = document.getElementById('right'),
        leftInput = document.getElementById('left'),
        topInput = document.getElementById('top');

    var values = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    topInput.addEventListener('input', function () {
        if (check(this)) {
            values.top = 0;
            this.value = '';
            result();
        } else {
            values.top = getMaxLength(this) + 'px';
            topValue.innerHTML = values.top;
            result();
        }
    });

    rightInput.addEventListener('input', function () {
        if (check(this)) {
            values.right = 0;
            this.value = '';
            result();
        } else {
            values.right = getMaxLength(this) + 'px';
            rightValue.innerHTML = values.right;
            result();
        }
    });

    bottomInput.addEventListener('input', function () {
        if (check(this)) {
            values.bottom = 0;
            this.value = '';
            result();
        } else {
            values.bottom = getMaxLength(this) + 'px';
            bottomValue.innerHTML = values.bottom;
            result(); 
        }
    });

    leftInput.addEventListener('input', function () {
        if (check(this)) {
            values.left = 0;
            this.value = '';
            result();
        } else {
            values.left = getMaxLength(this) + 'px';
            leftValue.innerHTML = values.left;
            result();
        }
    });
    
    var view = {
        show: function () {
            for (var i = 0; i < arguments.length; i++) {
                arguments[i].classList.remove('hidden');
            }
        },
        render: function(element) {
            if (element.top) element.top.innerHTML = values.top;
            if (element.right) element.right.innerHTML = values.right;
            if (element.bottom) element.bottom.innerHTML = values.bottom;
            if (element.left) element.left.innerHTML = values.left;
        },
        hide: function () {
            for (var i = 0; i < arguments.length; i++) {
                arguments[i].classList.add('hidden');
            }
        }
    };
    
    function result () {
        if (values.right === values.left &&
            values.top != values.bottom) {

            view.hide(leftValue);
            view.show(topValue, rightValue, bottomValue);
            view.render({
                top: topValue,
                right: rightValue,
                bottom: bottomValue
            });
        } else if (values.right === values.left &&
            values.top === values.bottom) {
            if (isAllSame()) {
                if (topInput.value === '' &&
                    rightInput.value === '' &&
                    bottomInput.value === '' &&
                    leftInput.value === '') {

                    topValue.innerHTML = 'none';
                    view.hide(bottomValue, rightValue, leftValue);
                } else {
                    view.hide(rightValue, bottomValue, leftValue);
                    view.render({
                        top: topValue
                    });
                }
            } else {
                view.show(topValue, rightValue);
                view.hide(leftValue, bottomValue);
                view.render({
                    top: topValue,
                    right: rightValue
                });
            }
        } else {
            view.show(rightValue, bottomValue, leftValue);
            view.render({
                top: topValue,
                right: rightValue,
                bottom: bottomValue,
                left: leftValue
            });
        }
    }

    function isAllSame () {
        return Object.keys(values).every(function(currentElement, index, array) {
            return !index || values[array[0]] === values[currentElement];
        });
    }

    function empty () {
        if (check(topInput) && check(rightInput) 
            && check(bottomInput) && check(leftInput)) {

            topValue.innerHTML = 'none';
            view.hide(bottomValue, rightValue, leftValue);
        }
    }

    function getMaxLength(element) {
        return element.value = (element.value.length > 4) ? element.value.slice(0, 4) : element.value; 
    }

    function check(input) {
        return input.value === '' || isNaN(input.value) || input.value.match(/^0+|\s|-|[.,]/g) ? true : false;
    }

    //Copy result

    var copyButton = document.getElementsByClassName('copy-button')[0];
    
    var clipboard = new Clipboard(copyButton, {
            text: function () {
                var elements = document.querySelectorAll('.top, .right:not(.hidden), .bottom:not(.hidden), .left:not(.hidden)'),
                    values = [];

                for (var i = 0; i < elements.length; i++) {
                    values.push(elements[i].innerText);
                }

                var textToCopy = property.innerText + ':' + ' ' + values.join(' ') + ';';

                return textToCopy;
            }
    });

    copyButton.addEventListener('click', function () {
        var copied = document.getElementsByClassName('copied')[0];

        copied.classList.remove('copy_hidden');
        copied.classList.add('copy_animation');

        setTimeout(function () {
            copied.classList.remove('copy_animation');
            copied.classList.add('visuallyhidden');

            setTimeout(function () {
                copied.classList.remove('visuallyhidden');
                copied.classList.add('copy_hidden');
            }, 450);
        }, 700);
    });

    //Switch button

    var property = document.getElementsByClassName('property')[0],
        switchLabel = document.querySelectorAll('.switch-label'),
        switched = true;

    switchLabel[0].addEventListener('click', function () {
        bottomInput.placeholder = 'padding-bottom';
        rightInput.placeholder = 'padding-right';
        leftInput.placeholder = 'padding-left';
        topInput.placeholder = 'padding-top';

        if (!switched) {
            property.style.opacity = 0;

            setTimeout(function () { 
                property.innerHTML = 'padding';
                property.style.opacity = 1;
                switched = true;
            }, 400);
        }
    });

    switchLabel[1].addEventListener('click', function () {
        bottomInput.placeholder = 'margin-bottom';
        rightInput.placeholder = 'margin-right';
        leftInput.placeholder = 'margin-left';
        topInput.placeholder = 'margin-top';
        
        if (switched) {
            property.style.opacity = 0;

            setTimeout(function () { 
                property.innerHTML = 'margin';
                property.style.opacity = 1;
                switched = false;
            }, 400);
        }
    }); 

    //Prevent default

    function preventSymbols(event) {
        var key = event.keyCode;

        if (key === 32 || key === 44 || 
            key === 45 || key === 46) {
            event.preventDefault();
        }
    }
    
    bottomInput.addEventListener('keypress', preventSymbols);
    rightInput.addEventListener('keypress', preventSymbols);
    leftInput.addEventListener('keypress', preventSymbols);
    topInput.addEventListener('keypress', preventSymbols);

    empty();     
}