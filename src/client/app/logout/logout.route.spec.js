/* jshint -W117, -W030 */
describe('logout routes', function () {
    describe('state', function () {

        beforeEach(function() {
            module('app.logout', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });


        it('should map state logout to url /logout ', function() {
            expect($state.href('logout', {})).to.equal('/logout');
        });

        it('of logout should work with $state.go', function () {
            $state.go('logout');
            $rootScope.$apply();
            expect($state.is('logout'));
        });
    });
});