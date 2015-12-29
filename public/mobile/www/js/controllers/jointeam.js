angular.module('app').controller('JoinTeamCtrl', function($scope, $http, $state, API_URL) {
    
  var userName = window.localStorage.userName;
  var listOfTeams = [];

  $scope.team = {
    teamName: '',
    createdBy: ''
  };

  $http.get(API_URL + 'listAllTeams')
  .success(function(teams) {
    console.log("list of teams " + JSON.stringify(teams));
    //teams["teams"][i]["teamName"]
    for (var i = 0; i < teams['teams'].length; i++) {
      console.log("teamnames: " + teams['teams'][i]['teamName']);
      listOfTeams.push(teams['teams'][i]['teamName']);
    }
  });

$scope.joinTeam = function() {
  console.log('In the Join Team function ' + $scope.team.teamName);
  $http.post(API_URL + 'joinTeam', {
      userName: userName,
      teamName: $scope.team.teamName
    })
    .success(function() {
      $state.go('roster');
      console.log('userName: ' + userNode["userName"] + ' teamName: ' + $scope.team.teamName);
    })
    .error(function(err) {
      console.log('NOT A REAL TEAM!' + err);
    });
};
});