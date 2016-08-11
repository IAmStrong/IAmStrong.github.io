app.directive('executeOnEscInfo', function($document) {
    return {
        restrict: 'A',
        link: function(scope) {
            return $document.bind('keydown', function(event) {
                if (event.which === 27) {
                    if (!scope.editMode) scope.reset();

                    return scope.editMode = false;
                }
            });
        }
    };
});