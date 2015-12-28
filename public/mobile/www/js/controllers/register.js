angular.module('app.controllers').controller('RegisterCtrl', function($scope, $http, $location) {

$scope.register = function() {
        $http.post('/register', {
            fullName: $scope.user.fullName,
            userName: $scope.user.userName,
            password: $scope.user.password, 
            email: $scope.user.email,
        })
        .success(function(user) {
            window.localStorage.user = JSON.stringify($scope.user);
            console.log('Registration: Received OK response from server.');
            $location.url('/gauntlet');
        })
        .error(function() {
            console.log('Registration: Received BAD response from server.');
            $location.url('/login');
        });
    };

});