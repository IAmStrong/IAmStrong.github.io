app.directive('executeOnEscModal', function($document) {
    return {
        restrict: 'A',
        link: function(scope) {
            return $document.bind('keydown', function(event) {
                if (event.which === 27) {
                    return scope.$apply(function () {
                        scope.showModal = false;
                    });
                }
            });
        }
    };
});