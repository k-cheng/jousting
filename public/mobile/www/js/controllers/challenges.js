angular.module('app').controller('ChallengesCtrl', function($scope, $http, API_URL) {

  var userName = JSON.parse(window.localStorage.userName);
  console.log("in challenge control");
  $scope.teamInfo = {
    users: [],
    teamName: ''
  };
  $scope.challenges = [];
  var teamUserIsIn;
  var usersInTeam;

  $http.post(API_URL +'getTeamName', {
      userName: userName
    })
    .success(function(teams) {
      teamUserIsIn = teams["teams"];
      console.log("teamarray " + JSON.stringify(teamUserIsIn[0]['teamName']));
      $scope.teamInfo.teamName = teamUserIsIn[0]['teamName'];
      console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName)

      $http.post(API_URL + 'listTeamChallenges', {
          teamName: teamUserIsIn[0]["teamName"]
        })
        .success(function(challenges) {
          console.log(JSON.stringify(challenges));
          for (var i = 0; i < challenges["challenges"].length; i++) {
            $scope.challenges.push(challenges["challenges"][i]["challengeName"]);
          }
          console.log("challenge names " + JSON.stringify($scope.challenges));
        })
        .error(function(err) {
          console.log('Could not retrive challenge list ' + err)
        });

    })
    .error(function(err) {
      console.log('Could not retrive team info ' + err);
    });

});