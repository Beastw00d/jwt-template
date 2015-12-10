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
					url: '/logout',
					controller: 'LogoutController',
					controllerAs: 'vm',
					title: 'Logout',
					settings: {
						nav: 5,
						content: 'Logout',
						hideUnauthenticated: true
					}
				}
			}
		];
	}
})();