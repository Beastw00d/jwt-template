(function() {
	'use strict';
	
	angular.module('app.register')
		.controller('RegisterController', RegisterController);
		
	RegisterController.$inject = ['logger', '$auth', '$rootScope', '$state'];	
	
	/* @ngInject */
	function RegisterController(logger, $auth, $rootScope, $state) {
		var vm = this;
		vm.title = 'Register';
		vm.user = {};
		
		vm.register = register;
		
		activate();
		
		function activate() {
			logger.info('Activated Register View');
		}
		
		function register() {
			$auth.signup({
				email: vm.user.email,
				password: vm.user.password
			}).then(function (res) {
				$auth.setToken(res.data.token);
				logger.success('Account Created! Welcome ' + res.data.user.email + '!');
				$rootScope.$emit( "auth_changed" );
				$state.go('admin');
			}).catch(function (err) {
				logger.error('Unable to create account :( ' + err.message);
			});
		}
		
		
		
	}
})();