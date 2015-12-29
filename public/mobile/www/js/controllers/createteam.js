angular.module('app').controller('CreateTeamCtrl', function($scope, $http, API_URL, $state) {
  var userName = window.localStorage.userName;
  var teams = window.localStorage.teams;
  console.log('userNode team is ', teams);
  console.log('scope user is', userName);
  $scope.team = {teamName: '', createdBy: ''};

  $scope.createTeam = function() {
      $http.post(API_URL + 'createTeam', {
          userName: userName,
          teamName: $scope.team.teamName
      })
      .success(function() {
          console.log($scope.team.teamName + ' has entered the gauntlet!');
          $location.url('/roster');
      })
      .error(function(err) {
          console.log('Team was not created :( '+err);
      });
      // get team name
  };
});

 
 