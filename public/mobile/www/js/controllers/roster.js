angular.module('app').controller('RosterCtrl', function($scope, $http, API_URL) {
    var userName = JSON.parse(window.localStorage.userName);
    console.log("in roster control");
    $scope.teamInfo = {
      users: [],
      teamName: ''
    }
    var teamUserIsIn;
    var usersInTeam;
    // $scope.getTeamName = function() {
    $http.post(API_URL + 'getTeamName', {
        userName: userName
      })
      .success(function(teams) {
        // console.log(JSON.stringify(teams));
        teamUserIsIn = teams["teams"];
        console.log("teamarray " + JSON.stringify(teamUserIsIn[0]['teamName']));
        // teamUserIsIn[index]["teamName"];
        $scope.teamInfo.teamName = teamUserIsIn[0]['teamName'];
        console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName)

        // NESTED HTTP POST REQUEST IS BAD PRACTICE! NEEDS REFACTORING!
        $http.post(API_URL + 'roster', {
            teamName: teamUserIsIn[0]["teamName"]
          })
          .success(function(users) {
            // console.log("userarray "+JSON.stringify(users));
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
      // }
      //teamUserIsIn[index]["teamName"]
});