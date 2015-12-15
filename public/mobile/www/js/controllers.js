angular.module('app.controllers', [])

.controller('authCtrl', function($scope, $http, $location) {
    $scope.user = {fullName: '', userName: '', email: '', password: ''};

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

    $scope.logout = function() {
        $http.post('/logout')
        .success(function() {
            delete window.localStorage.user;
            console.log('Logout: Received OK response from server.');
            $location.url('/');
        })
        .error(function() {
            console.log('Logout: Received BAD response from server.');
        });
    };
})

// .controller('loginCtrl', function($scope) {

// })

.controller('createATeamCtrl', function($scope, $http, $location) {
    var userNode = JSON.parse(window.localStorage['user']);
    console.log('userNode team is ', userNode.teams)
    console.log('scope user is', userNode.userName);
    $scope.team = {teamName: '', createdBy: ''};

    $scope.createTeam = function() {
        $http.post('/createTeam', {
            userName: userNode.userName,
            teamName: $scope.team.teamName
        })
        .success(function() {
            console.log($scope.team.teamName + ' has entered the gauntlet!');
            $location.url('/roster');
        })
        .error(function(err) {
            console.log('Team was not created :( '+err);
        })
        // get team name
    };
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
