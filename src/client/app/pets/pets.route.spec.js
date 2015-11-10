/* jshint -W117, -W030 */
describe('pets routes', function(){
	describe('state', function (){
		var view = 'app/pets/pets.html';
		
		beforeEach(function() {
			module('app.pets', bard.fakeToastr);
			bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
		});
		
		beforeEach(function() {
			$templateCache.put(view, '');
		});
		
		it('should map state pets to url /pets ', function() {
			expect($state.href('pets', {})).to.equal('/');
		});
		
		it('should map /pet route to the pet View template', function() {
			expect($state.get('pets').templateUrl).to.equal(view);
		});
		
		it('of pets should work with $state.go', function (){
			$state.go('pets');
			$rootScope.$apply();
			expect($state.is('pets'));
		});
	});
});