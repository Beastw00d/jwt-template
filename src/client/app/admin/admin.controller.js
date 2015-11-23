(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', 'dataservice', '$q'];
    /* @ngInject */
    function AdminController(logger, dataservice, $q) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
			var promises = [getAdmin()];
			return $q.all(promises).then(function() {
				logger.info('Activated Admin View');
			});
			
		 }
		
		 function getAdmin(){
			return dataservice.getAdmin('0').then(function (data){
				vm.admin = data;
				return vm.admin;
			});
		 }
    }
})();
