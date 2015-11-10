/* jshint -W117, -W030 */
describe('layout', function() {
    describe('sidebar', function() {
        var controller;
        var views = {
            pets: 'app/pets/pets.html'
        };

        beforeEach(function() {
            module('app.layout', bard.fakeToastr);
            bard.inject('$controller', '$httpBackend', '$location',
                          '$rootScope', '$state', 'routerHelper');
        });

        beforeEach(function() {
            routerHelper.configureStates(mockData.getMockStates(), '/');
            controller = $controller('SidebarController');
            $rootScope.$apply();
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should have isCurrent() for / to return `current`', function() {
            $location.path('/');
            expect(controller.isCurrent($state.current)).to.equal('current');
        });
        
         it('should have isCurrent() for /pets to return `current`', function() {
            $location.path('/pets');
            expect(controller.isCurrent($state.current)).to.equal('current');
        });

        it('should have isCurrent() for non route not return `current`', function() {
            $location.path('/invalid');
            expect(controller.isCurrent({title: 'invalid'})).not.to.equal('current');
        });
    });
});
