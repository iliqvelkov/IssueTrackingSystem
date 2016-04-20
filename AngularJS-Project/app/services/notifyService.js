'use strict';

app.factory('notifyService',
    function () {
        return {
            showInfo: function(msg) {
                noty({
                    text: msg,
                    type: 'success',
                    layout: 'topCenter',
                    force: true,
                    theme: 'relax',
                    killer: true,
                    timeout: 1000}
                );
            },
            showError: function(msg, serverError) {
                var errors = [];
                if (serverError && serverError.error_description) {
                    errors.push(serverError.error_description);
                }
                if (serverError && serverError.ModelState) {
                    var modelStateErrors = serverError.ModelState;
                    for (var propertyName in modelStateErrors) {
                        var errorMessages = modelStateErrors[propertyName];
                        var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                        for (var i = 0; i < errorMessages.length; i++) {
                            var currentError = errorMessages[i];
                            errors.push(trimmedName + ' - ' + currentError);
                        }
                    }
                }
                if (errors.length > 0) {
                    msg = msg + ":<br>" + errors.join("<br>");
                }
                noty({
                    text: msg,
                    type: 'error',
                    force: true,
                    killer: true,
                    layout: 'topCenter',
                    theme: 'relax',
                    timeout: 5000}
                );
            }
        }
    }
);
