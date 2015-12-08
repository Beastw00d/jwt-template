/* jshint -W117, -W030 */
describe('register routes', function () {
    describe('state', function () {
        var view = 'app/register/register.html';

        beforeEach(function() {
            module('app.register', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state register to url /register ', function() {
            expect($state.href('register', {})).to.equal('/register');
        });

        it('should map /register route to register View template', function () {
            expect($state.get('register').templateUrl).to.equal(view);
        });

        it('of register should work with $state.go', function () {
            $state.go('register');
            $rootScope.$apply();
            expect($state.is('register'));
        });
    });
});