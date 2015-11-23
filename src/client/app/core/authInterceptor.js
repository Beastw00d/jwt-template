(function () {
	'use strict';
	
	angular.module('app.core')
		.factory('authInterceptor', authInterceptor);
	/* @ngInject */
	authInterceptor.$inject = ['authToken'];
	
	function authInterceptor(authToken) {
		return {
			request: function(config) {
				var token = authToken.getToken();
				
				if(token) {
					config.headers.Authorization = 'Bearer ' + token;
				}
				return config;
			},
			response: function(response) {
				return response;
			}
		}
	}
})();