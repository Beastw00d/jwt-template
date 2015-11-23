(function () {
	'use strict';
	
	angular.module('app.core')
		.directive('sameAs', sameAs);
		
	function sameAs() {
		return {
			require: 'ngModel',
			restrict: 'A',
			scope: { password:'=sameAs'},
			link: function (scope, element, attrs, ctrl) {
				ctrl.$validators.match = function (moduleValue, viewValue) {
					return viewValue === scope.password;
				}
			}
		}
	}
})();