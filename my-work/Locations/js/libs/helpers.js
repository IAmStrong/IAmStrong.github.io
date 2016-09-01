'use strict';

var App = App || {};

App.helpers = (function () {
    function find(selector) {
        return document.querySelector(selector);
    }

    function findBy(param, name) {
        var search = {
            'class': function () {
                return document.getElementsByClassName(name)[0];
            },
            'id': function () {
                return document.getElementById(name);
            }
        };

        return search[param]();
    }

    function clear(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function isEmpty(element) {
        return element.innerText === '' ? true : false;
    }

    function addClass(element, classListArray) {
        var length = classListArray.length,
            list = classListArray,
            count = 0;

        while (length > count) {
            element.classList.add(list[count]);
            ++count;
        }
    }

    function removeClass(element, classListArray) {
        var length = classListArray.length,
            list = classListArray,
            count = 0;

        while (length > count) {
            element.classList.remove(list[count]);
            ++count;
        }
    }

    function equalProperties(objOne, objTwo) {
        if (objOne.name == objTwo.name &&
            objOne.groups == objTwo.groups &&
            objOne.teachers == objTwo.teachers) {
            return true;
        } else {
            return false;
        }
    }

    return {
        find: find,
        findBy: findBy,
        clear: clear,
        isEmpty: isEmpty,
        addClass: addClass,
        removeClass: removeClass,
        equalProperties: equalProperties
    };
})();