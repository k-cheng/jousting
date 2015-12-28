angular.module('app.controllers').controller('LoginCtrl', function($scope, $http, $location) {

$scope.login = function() { 
        $http.post('/login', {
            userName: $scope.user.userName,
            password: $scope.user.password,
        })
        .success(function (user) {
            window.localStorage.user = JSON.stringify($scope.user);
            console.log('Login: Received OK response from server.');
            $location.url('/gauntlet');
        })
        .error(function () {
            console.log('Login: Received BAD response from server.');
            $location.url('/login');
        });
    };

});