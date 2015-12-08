angular.module('app.controllers', [])

.controller('authCtrl', function($scope) {
    $scope.user = {name: '', username: '', email: '', password: ''}

    // placeholder until auth is implemented
    $scope.login = function() {
        $scope.error_message = 'login request for ' + $scope.user.username;
        console.log('IN THE LOGIN function')
    }

    // placeholder until auth is implemented
    $scope.register = function() {
        $scope.error_message = 'REGISTER request for ' + $scope.user.username;
        console.log('YOU IN THE REGISTER FUNCTION');
    }
})

// .controller('loginCtrl', function($scope) {

// })

.controller('createATeamCtrl', function($scope) {

})

.controller('joinATeamCtrl', function($scope) {

})

.controller('homeCtrl', function($scope) {

})

.controller('rosterCtrl', function($scope) {

})

.controller('gauntletCtrl', function($scope) {

})

.controller('theTeamCtrl', function($scope) {

})
