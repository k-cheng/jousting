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
    var storage = $window.localStorage;
    var team = storage.getItem('team');
    $scope.teamInfo.teamName = team;
  
    console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName);

    $http.post(API_URL + 'roster', {
        teamName: team
    })
    .success(function(users) {
      console.log('cory', users.users);
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