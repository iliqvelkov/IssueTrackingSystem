app.factory('notifyService', [function () {
    var options = {
        layout: 'topCenter',
        theme: 'relax',
        timeout: 1900
    };

    function success(message) {
        options.type = 'success';
        options.text = message;

        noty(options);
    }

    function error(message) {
        options.type = 'error';
        options.text = message;

        noty(options);
    }

    return {
        success: success,
        error: error
    }
}]);