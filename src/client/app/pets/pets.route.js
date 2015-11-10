(function(){
	'use strict';
	
	angular
		.module('app.pets')
		.run(appRun);
		
	appRun.$inject = ['routerHelper'];
	/* @ngInject */
	function appRun(routeHelper) {
		routeHelper.configureStates(getStates());
	}
	
	function getStates() {
		return [
			{
				state: 'pets',
				config: {
					url: '/',
					templateUrl: 'app/pets/pets.html',
					controller: 'PetsController',
					controllerAs: 'vm',
					title: 'Pets',
					settings: {
						nav: 1,
						content: '<i class="fa fa-lock"></i>Pets'
					}
				}
			}
		];
	}
})();