angular.module('app.controllers', [])

.controller('authCtrl', function($scope, $http, $location) {
    $scope.user = {fullName: '', userName: '', email: '', password: ''}

    // placeholder until auth is implemented
    $scope.login = function() { 
        $http.post('/login', {
            userName: $scope.user.userName,
            password: $scope.user.password,
        })
        .success(function (user) {
            console.log('Received OK response from server.');
            $location.url('/gauntlet');
        })
        .error(function () {
            console.log('Received BAD response from server.');
            $location.url('/login');
        // $scope.error_message = 'login request for ' + $scope.user.username;
        });
    };

    // placeholder until auth is implemented
    $scope.register = function() {
        $http.post('/register', {
            fullName: $scope.user.fullName,
            userName: $scope.user.userName,
            password: $scope.user.password, 
            email: $scope.user.email,
        })
        .success(function(user) {
            console.log('Registration successful.');
            $location.url('/gauntlet');
        })
        .error(function() {
            console.log('Registration failed.');
            $location.url('/login');
        // $scope.error_message = 'login request for ' + $scope.user.username;
        });
    };

    $scope.logout = function() {
        $http.post('/logout')
        .success(function() {
            console.log('Logout successful.');
            $location.url('/');
        })
        .error(function() {
            console.log('Logout failed.');
        });
    };
})

// .controller('loginCtrl', function($scope) {

// })

.controller('createATeamCtrl', function($scope) {
    $scope.team = {teamName: '', createdBy: ''}

    $scope.createTeam = function() {
        // get team name
        console.log($scope.team.teamName + ' has entered the gauntlet!');
    }
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
