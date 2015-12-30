angular.module('app').controller('RosterCtrl', function($scope, $http, API_URL, $window) {
    
  var email = window.localStorage.email;
  
  $scope.teamInfo = {
    users: [],
    teamName: ''
  };

  var usersInTeam;
 
  $http.post(API_URL + 'getTeamName', {
    email: email
  }).success(function(teams) {
    var teamUserIsIn = $window.localStorage.team;
    $scope.teamInfo.teamName = teamUserIsIn;
  
    console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName);

    // NESTED HTTP POST REQUEST IS BAD PRACTICE! NEEDS REFACTORING!
    $http.post(API_URL + 'roster', {
        teamName: teamUserIsIn
    }).success(function(users) {
      console.log('cory', users);
      usersInTeam = users["users"];
      $scope.teamInfo.users = usersInTeam;
      // for (var i = 0; i < usersInTeam.length; i++) {
      //     $scope.teamInfo.users.push(JSON.stringify(usersInTeam[i]['userName']));
      //     console.log("userNameArray: "+$scope.teamInfo.users);
      //     // usersInTeam[index]["userName"];
      // }
    })
      .error(function(err) {
      console.log('Could not retrive roster list ' + err)
    })

    })
    .error(function(err) {
      console.log('Could not retrive user info ' + err);
    })

});