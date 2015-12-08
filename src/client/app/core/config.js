(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Petinder Error] ',
        appTitle: 'Petinder'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }
    
    
    core.config(authConfig);
    
    authConfig.$inject = ['$httpProvider', '$authProvider'];
    /* @ngInject */
    function authConfig($httpProvider, $authProvider){
        $authProvider.loginUrl = '/api/login';
        $authProvider.signupUrl = '/api/register';

	    $authProvider.facebook({
		  clientId: '1505087449785117',
		  url: '/api/' + 'auth/facebook',
          popupOptions: { width: 580, height: 400 }
	    });
        
        
        $httpProvider.interceptors.push('authInterceptor');
    }
})();
