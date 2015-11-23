(function () {
	'use strict'
	
	angular.module('app.core')
		.factory('authToken', authToken);
	/* @ngInject */
	authToken.$inject = ['$window'];
	function authToken($window) {
		var storage = $window.localStorage;
		var cachedToken;
		var userToken = 'userToken';
		var isAuthenticated = false;
		
		var token = {
			setToken: function(token) {
				cachedToken = token;
				storage.setItem(userToken, token);
				isAuthenticated = true;
			},
			getToken: function() {
				if(!cachedToken){
					cachedToken = storage.getItem(userToken);
				}
				return cachedToken;
			},
			isAuthenticated: function() {
				return !!token.getToken(); 
			},
			removeToken: function() {
				cachedToken = null;
				storage.removeItem(userToken);
				isAuthenticated = false;
			}
		}
		
		return token;
	}
	
})();