/* jshint -W117, -W030 */
describe('LogoutController', function() {
    var controller;
    beforeEach(function() {
        bard.appModule('app.logout');
        bard.inject('$controller', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('LogoutController', {
            $state: {
                go: function(msg) {
                    return true;
                }
            }
        });
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Logout controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
