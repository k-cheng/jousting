angular.module('app').controller('CreateTeamCtrl', function($scope, $http, $state, $window, API_URL) {
  
  var email = window.localStorage.email;

  $scope.team = {teamName: '', createdBy: ''};

  $scope.createTeam = function() {
    $http.post(API_URL + 'createTeam', {
        email: email,
        teamName: $scope.team.teamName
    })
    .success(function() {
      var storage = $window.localStorage;
      storage.setItem('team', $scope.team.teamName);
      console.log($scope.team.teamName + ' has entered the gauntlet!');
      $state.go('roster');
    })
    .error(function(err) {
      $state.go('createTeam');
      console.log('Team already exists. '+err);
    });
  
  };

});

 
 