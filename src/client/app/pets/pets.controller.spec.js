/* jshint -W117, -W030 */
describe('PetsController', function() {
	var controller;
	var pets = mockData.getMockPets();
	
	beforeEach(function() {
		bard.appModule('app.pets');
		bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
	});
	
	beforeEach(function() {
		sinon.stub(dataservice, 'getPets').returns($q.when(pets));
		controller = $controller('PetsController');
		$rootScope.$apply();
	});
	
	bard.verifyNoOustandingHttpRequests();
	
	describe('Pets controller', function() {
		it('should be created successfully', function() {
			expect(controller).to.be.defined;
		});
		
		describe('after activate', function() {
			it('should have title Pets', function() {
				expect(controller.title).to.equal('Pets');
			});

			it('should have logged "Activated"', function(){
				expect($log.info.logs).to.match(/Activated/);
			});
			
			it('should have at leasr 1 pet', function() {
				expect(controller.pets).to.have.length.above(0);
			});
			
			it('should have pets count of 5', function() {
				expect(controller.pets).to.have.length(5);
			});
		});
	});
});