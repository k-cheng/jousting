angular.module('app').controller('RosterCtrl', function($scope, $http, API_URL, $window) {
    
  var email = window.localStorage.email;
  
  $scope.teamInfo = {
    users: [],
    teamName: ''
  };

  $http.post(API_URL + 'getTeamName', {
    email: email
  })
  .success(function(teams) {
    
    var team = teams['teams'][0].teamName;
    console.log('test', team);
    $scope.teamInfo.teamName = team;

    $http.post(API_URL + 'roster', {
        teamName: team
    })
    .success(function(users) {
      usersInTeam = users.users;
      $scope.teamInfo.users = usersInTeam;
    })
    .error(function(err) {
      console.log('Could not retrive roster list ' + err);
    });
  })
  .error(function(err) {
    console.log('Could not retrive user info ' + err);
  });

});