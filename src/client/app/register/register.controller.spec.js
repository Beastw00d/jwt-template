/* jshint -W117, -W030 */
describe('RegisterController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.register');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('RegisterController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Register controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Admin', function() {
                expect(controller.title).to.equal('Register');
            });

            // it('should have logged "Activated"', function() {
            //     expect($log.info.logs).to.match(/Activated/);
            // });
        });
    });
});
