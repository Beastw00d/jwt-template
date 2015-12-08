(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    /* @ngInject */
    function exception($q, logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(e) {
                var thrownDescription;
                var newMessage;
                if (e.data && e.data.message) {
                    thrownDescription = '\n' + e.data.message;
                    newMessage = message + thrownDescription;
                }
                e.data.message = newMessage;
                logger.error(newMessage);
                return $q.reject(e);
            };
        }
    }
})();
