angular.module('app').controller('SubmissionCtrl', function($scope, $http, API_URL, $window) {
    
  var email = window.localStorage.email;
  console.log("email "+email);
  
  $scope.teamInfo = {
    users: [],
    teamName: ''
  };

  var usersInTeam;
  $scope.challengesInTeam;

  $scope.imgURL = [];
 
  $http.post(API_URL + 'getTeamName', {
    email: email
  })
  .success(function(teams) {
    console.log(JSON.stringify(teams));
    var teamUserIsIn = teams['teams'][0]["teamName"];
    $scope.teamInfo.teamName = teamUserIsIn;
    console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName);
      $http.post(API_URL + 'roster', {
        teamName: teamUserIsIn
      }).success(function(users) {
        console.log('cory', users);
        usersInTeam = users["users"];
        $scope.teamInfo.users = usersInTeam;

        console.log(JSON.stringify($scope.teamInfo.users));

        $http.post(API_URL + 'listTeamChallenges', {
          teamName: teamUserIsIn
        })
        .success(function(challenges) {
          console.log('challenges ', challenges);
          $scope.challengesInTeam = challenges['challenges'][0]['challengeName'];

          for(var i = 0 ; i < usersInTeam.length ; i++){
            console.log(usersInTeam[i]['userName']);
            $scope.imgURL.push(API_URL + 'getSubmissionInfo/' + usersInTeam[i]['userName'] + '/' + challenges['challenges'][0]['challengeName']);
          }

          console.log($scope.imgURL);

        })
        .error(function(err) {
          console.log('Could not retrieve challenge list ' + err);
        });

      })
      .error(function(err) {
        console.log('Could not retrieve roster list ' + err);
      });

    })
    .error(function(err) {
      console.log('Could not retreive user info ' + err);
  });

});