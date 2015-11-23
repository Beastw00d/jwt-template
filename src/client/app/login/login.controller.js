(function () {
	'use strict';
	
	angular.module('app.login')
		.controller('LoginController', LoginController);
	/* @ngInject */	
	LoginController.$inject = ['logger', '$auth', '$rootScope', '$state'];	
	function LoginController(logger, $auth, $rootScope, $state) {
		var vm = this;
		vm.title = 'Login';
		vm.user = {};
		
		vm.login = login;
		vm.authenticate = authenticate;
		
		activate();
		
		function activate() {
			logger.info('Activated Login View');
		}
		
		function login() {
			$auth.login({
				email: vm.user.email,
				password: vm.user.password
			}).then(function (res) {
				var message = 'Thanks for coming back ' + res.data.user.email + '!';
				
				if (!res.data.user.active) {
					message = 'Just a reminder, please activate your account soon :)';
				}
				$rootScope.$emit( "auth_changed" );
				$state.go('admin');
				logger.success(message);
			}).catch(handleError);
		}
		
		function authenticate(provider) {
			$auth.authenticate(provider).then(function (res) {
				$rootScope.$emit( "auth_changed" );
				logger.success('Thanks for coming back ' + res.data.user.displayName + '!');
			}, handleError);
		}
		
		function handleError(err) {
			logger.error('Something went wrong ' + err.message);
		}
		
		// function login() {
		// 	dataservice.register(vm.user).then(function (data){
		// 		logger.success('Success! Welcome, ' + data.user.email + '!');
		// 		authToken.setToken(data.token);
		// 	});
		// }
	}
})();