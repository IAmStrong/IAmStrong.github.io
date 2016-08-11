app.controller('modal-ctrl', function($scope, $timeout, shareData) {
    $scope.mode = {
        set: function(action) {
            return this.action = action;
        }
    };
    shareData.store('open-modal-add', function () {
        $scope.title = "Add new student";
        $scope.mode.set('add');

        return $scope.showModal = true;
    });
    shareData.store('open-modal-edit', function () {
        var student = shareData.get('edit-student'),
            data = {
                firstName: student.firstName,
                lastName: student.lastName,
                gender: student.gender,
                skype: student.skype,
                id: student.$$hashKey
            };

        $scope.id = data.id;
        $scope.firstName = data.firstName;
        $scope.lastName = data.lastName;
        $scope.gender = data.gender;
        $scope.skype = data.skype;

        $scope.title = "Edit student info";
        $scope.mode.set('edit');

        return $scope.showModal = true;
    });
    $scope.resetForm = function () {
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.gender = '';
        $scope.skype = '';
        $scope.errorBorder = {
            'border': 'none'
        };
    }
    $scope.$watch('showModal', function () {
        var action = $scope.mode.action;

        if (action === 'add') {
            if ($scope.showModal === false) {
                $timeout(function () {
                    $scope.resetForm();
                }, 170); //CSS transition delay
            } else {
                $scope.resetForm();
            }
        }
    });
    $scope.$watch('gender', function () {
        $scope.errorBorder = {
            'padding': '3px 6px',
            'border': 'none'
        };
    });
    $scope.checkInput = function(value) {
        var string = $scope[value],
            maxLength = 18,
            inputs = {
                firstName: function () {
                    var pattern = /[^a-zA-Z]+/g;

                    $scope.firstName = string.replace(pattern, '');
                },
                lastName: function () {
                    var pattern = /[^a-zA-Z]+/g;

                    $scope.lastName = string.replace(pattern, '');
                },
                skype: function () {
                    var pattern = /[^a-zA-Z0-9\-\.\_]+/g;

                    $scope.skype = string.replace(pattern, '');
                }
            };

        if (string.length > maxLength) {
            string = string.substring(0, maxLength);
        }

        inputs[value]();
    }
    $scope.getInputValues = function(mode) {
        var data = {};

        if (mode === 'add') {
            if (!$scope.gender) {
                $scope.errorBorder = {
                    'padding': '2px 5px',
                    'border': '1px solid #c0392b'
                };
            } else {
                data.firstName = $scope.firstName || 'Unknown';
                data.lastName = $scope.lastName || 'Unknown';
                data.gender = $scope.gender;
                data.skype = $scope.skype || 'Unknown';

                shareData.store('new-student', data);
                shareData.call('add-new-student');

                return $scope.showModal = false;
            }
        } else if (mode === 'edit') {
            data.firstName = $scope.firstName || 'Unknown';
            data.lastName = $scope.lastName || 'Unknown';
            data.gender = $scope.gender;
            data.skype = $scope.skype || 'Unknown';

            data.id = $scope.id;

            shareData.store('edited-student', data);
            shareData.call('edit-existed-student');

            return $scope.showModal = false;
        }
    }
});