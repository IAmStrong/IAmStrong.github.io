app.directive('executeOnEnter', function($document) {
    return {
        restrict: 'A',
        link: function(scope) {
            return $document.bind('keydown', function(event) {
                return scope.$apply(function () {
                    if (event.which === 13) scope.getInputValues(scope.mode.action);
                });
            });
        }
    };
});