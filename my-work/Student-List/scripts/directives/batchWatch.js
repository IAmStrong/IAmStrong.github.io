app.directive('batchWatch', ['$timeout', function($timeout) {
    return {
        link: function(scope) {
            scope.$watch('$index', function(newIndex, oldIndex) {
                if (newIndex != oldIndex) {
                    if (scope.el === oldIndex) {
                        $timeout(function () {
                            scope.$apply(function () {
                                scope.currentElement(newIndex);
                            });
                        });
                    }
                }
            });
        }
    };
}]);