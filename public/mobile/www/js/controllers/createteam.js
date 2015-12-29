angular.module('app').controller('CreateTeamCtrl', function($scope, $http, API_URL, $state) {
<<<<<<< 301c983e161fec8f6682806e72a4eacc3c2d8acb
  var userName = window.localStorage.userName;
=======
  var userName = JSON.parse(window.localStorage.userName);
>>>>>>> (fix) fixes controllers
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

 
 