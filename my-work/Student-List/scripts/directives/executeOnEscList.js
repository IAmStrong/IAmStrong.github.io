app.directive('executeOnEscList', function($document) {
    return {
        restrict: 'A',
        link: function(scope) {
            return $document.bind('keydown', function(event) {
                if (event.which === 27) {
                    if (!scope.editMode && scope.info) {
                        scope.reset();
                    } else if (!scope.addMode && !scope.info && scope.shown) {
                        scope.toggleOrderOptions();
                    }

                    scope.editMode = false;
                    scope.addMode = false;
                }
            });
        }
    };
});