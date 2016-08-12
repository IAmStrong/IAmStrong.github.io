app.controller('list-ctrl', function($scope, shareData) {
    $scope.group = 'Dp-093 JS';
    $scope.students = [{
        firstName: 'Artem',
        lastName: 'Zhylko',
        gender: 'male',
        skype: 'artemzhylko'
    }, {
        firstName: 'Vladyslava',
        lastName: 'Tyschenko',
        gender: 'female',
        skype: 'pretty_vampire777'
    }, {
        firstName: 'Anastasyia',
        lastName: 'Serheeva',
        gender: 'female',
        skype: 'anastacia.sergeeva'
    }, {
        firstName: 'Anna',
        lastName: 'Hranovs\'ka',
        gender: 'female',
        skype: 'xotja_an'
    }, {
        firstName: 'Yuryi',
        lastName: 'Tataryntsev',
        gender: 'male',
        skype: 'tatarincev1988'
    }, {
        firstName: 'Anastasiia',
        lastName: 'Manil\'nykova',
        gender: 'female',
        skype: 'lisssa7771'
    }, {
        firstName: 'Denys',
        lastName: 'Poznukhov',
        gender: 'male',
        skype: 'oggythetoad'
    }, {
        firstName: 'Yana',
        lastName: 'Sharipbaeva',
        gender: 'female',
        skype: 'sharipbaeva.yana'
    }];
    $scope.fullName = function(student) {
        var option = $scope.order.option,
            orderBy = {
                'default': function () {
                    return student.firstName + ' ' + student.lastName;
                },
                'lastName': function () {
                    return student.lastName + ' ' + student.firstName;
                }
            };

        return (orderBy[option] || orderBy['default'])();
    }
    $scope.addStudent = function () {
        $scope.reset();
        shareData.call('open-modal-add');
        $scope.addMode = true;
    }
    $scope.removeStudent = function(student, index) {
        $scope.students.splice($scope.students.indexOf(student), 1);
        if (index === $scope.el) $scope.reset();
    }
    $scope.editStudent = function () {
        shareData.store('edit-student', $scope.info);
        shareData.call('open-modal-edit');
        $scope.editMode = true;
    }
    $scope.showInfo = function(student) {
        $scope.info = student;
    }
    $scope.title = 'Student Info';
    $scope.currentElement = function(index) {
        $scope.el = index;
    }
    $scope.toggleOrderOptions = function () {
        $scope.optionsContainer =! $scope.optionsContainer; 
        $scope.shown =! $scope.shown;
    }
    $scope.order = {
        set: function(option) {
            $scope.reset();

            return this.option = option;
        }
    };
    $scope.reset = function () {
        $scope.el = null;
        $scope.info = false;
    }
    $scope.$watchCollection('query', function () {
        $scope.reset();
    });
    $scope.$watch(function () {
        $scope.listLength = document.querySelectorAll('.list ul li').length;

        return $scope.listLength;
    }, function () {
        if ($scope.listLength > 0) {
            return $scope.lineThrough();
        }
    });
    shareData.store('add-new-student', function () {
        $scope.students.push(shareData.get('new-student'));
        $scope.addMode = false;
    });
    shareData.store('edit-existed-student', function () {
        var student = shareData.get('edited-student');

        angular.forEach($scope.students, function(value, key) {
            if (student.id === value.$$hashKey) {
                value.firstName = student.firstName;
                value.lastName = student.lastName;
                value.gender = student.gender;
                value.skype = student.skype;
            }
        });

        $scope.editMode = false;
    });
    $scope.search = function(student) {
        if (!$scope.query || 
        (student.firstName.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) || 
        (student.lastName.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)) {
            return true;
        }
        return false;
    }
    $scope.changeBgColor = function(value) {
        if (value === 'male') {
            return {
                'background-color': '#6cabe1'
            };
        } else if (value === 'female') {
            return {
                'background-color': '#e2a0b9'
            };
        }
    }
    $scope.lineThrough = function () {
        var a = document.querySelectorAll('.list ul a');
    
        [].forEach.call(a, function(el) {
            el.addEventListener('mouseover', function () {
                textDecoration('add', el);
            });

            el.addEventListener('mouseout', function () {
                textDecoration('remove', el);
            });
        });
        
        function textDecoration(action, el) {
            var elem = el.previousSibling;
    
            function addTextDecoration () {
                return elem.previousSibling.style.textDecoration = 'line-through';
            }
    
            function removeTextDecoration () {
                return elem.previousSibling.style.textDecoration = 'none';
            }
    
            var style = {
                'add': addTextDecoration,
                'remove': removeTextDecoration
            };
    
            return style[action]();
        }
    }
});