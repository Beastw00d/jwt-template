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
        
        // $authProvider.google({
		//   clientId: '755194447289-i6qu5n18jnh4lhph17j19cq08i0fq6f4.apps.googleusercontent.com',
		//   url: '/api/' + 'auth/google'
	    // });

	    // $authProvider.facebook({
		//   clientId: '698580886903269',
		//   url: '/api/' + 'auth/facebook'
	    // });
        
        
        $httpProvider.interceptors.push('authInterceptor');
    }
    
    core.config

})();
