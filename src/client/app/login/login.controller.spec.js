/* jshint -W117, -W030 */
describe('LoginController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('LoginController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Login controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});