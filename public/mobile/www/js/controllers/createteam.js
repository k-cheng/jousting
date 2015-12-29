angular.module('app').controller('CreateTeamCtrl', function($scope, $http, API_URL, $state) {
 
  var userNode = JSON.parse(window.localStorage['user']);
  console.log('userNode team is ', userNode.teams)
  console.log('scope user is', userNode.userName);
  $scope.team = {teamName: '', createdBy: ''};

  $scope.createTeam = function() {
      $http.post(API_URL + 'createTeam', {
          userName: userNode.userName,
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

 