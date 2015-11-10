(function () {
	'use strict';
	
	angular
	.module('app.pets')
	.controller('PetsController', PetsController);
	
	PetsController.$inject = ['$q', 'dataservice','logger'];
	/* @ngInject */
	function PetsController($q, dataservice, logger){
		var vm = this;
		vm.title = 'Pets';
		vm.pets = [];
		
		activate();
		
		function activate() {
			var promises = [getPets()];
			return $q.all(promises).then(function() {
				logger.info('Activated Pets View');
			});
			
		}
		
		function getPets(){
			return dataservice.getPets().then(function (data){
				vm.pets = data;
				return vm.pets;
			});
		}
	}
})();