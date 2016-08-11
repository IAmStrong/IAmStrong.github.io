app.filter('format', function () {
    return function(string) {
        var txt;

        if (string === 'firstName') {
            txt = 'First Name' + ':';
        } else if (string === 'lastName') {
            txt = 'Last Name' + ':';
        } else {
            txt = string.charAt(0).toUpperCase() + string.slice(1) + ':';
        }

        return txt;
    };
});