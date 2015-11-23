(function(){
	'use strict';
	
	angular
		.module('app.logout')
		.run(appRun);
		
	appRun.$inject = ['routerHelper'];
	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}
	
	function getStates() {
		return [
			{
				state: 'logout',
				config: {
					url: '/',
					controller: 'LogoutController',
					controllerAs: 'vm',
					title: 'Logout',
					settings: {
						nav: 4,
						content: '<i class="fa fa-lock"></i>Logout',
						hideUnauthenticated: true
					}
				}
			}
		];
	}
})();