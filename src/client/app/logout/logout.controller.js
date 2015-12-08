(function () {
	'use strict';
	
	angular.module('app.logout')
		.controller('LogoutController', LogoutController);
	
	LogoutController.$inject = ['$auth', '$state', '$rootScope'];
	 /* @ngInject */
	function LogoutController($auth, $state, $rootScope) {
			$auth.logout();
			$rootScope.$emit('auth_changed');
			$state.go('login');
	}
})();