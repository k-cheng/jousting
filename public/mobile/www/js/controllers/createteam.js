angular.module('app').controller('CreateTeamCtrl', function($scope, $http, $state, API_URL) {
  
  var email = window.localStorage.email;

  $scope.team = {teamName: '', createdBy: ''};

  $scope.createTeam = function() {
    $http.post(API_URL + 'createTeam', {
        email: email,
        teamName: $scope.team.teamName
    })
    .success(function() {
        console.log($scope.team.teamName + ' has entered the gauntlet!');
        $state.go('roster');
    })
    .error(function(err) {
        console.log('Team already exists. '+err);
    });
  
  };

});

 
 