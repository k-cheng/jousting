angular.module('app').controller('JoinTeamCtrl', function($scope, $http, API_URL) {
    var userNode = JSON.parse(window.localStorage.userName);
    var listOfTeams = [];
    $scope.team = {teamName: '', createdBy: ''};
    console.log("userNode "+JSON.stringify(userNode));

    $http.get(API_URL + 'listAllTeams')
        .success(function(teams) {
            console.log("list of teams "+JSON.stringify(teams));
            //teams["teams"][i]["teamName"]
            for (var i = 0; i < teams['teams'].length; i++) {
                console.log("teamnames: "+teams['teams'][i]['teamName']);
                listOfTeams.push(teams['teams'][i]['teamName']);
            }
        });

    $scope.joinTeam = function() {
        console.log('In the Join Team function ' + $scope.team.teamName);
        $http.post(API_URL + 'joinTeam', {
            userName: userNode["userName"],
            teamName: $scope.team.teamName
        })
            .success(function() {
                $location.url('/roster');
                console.log('userName: ' + userNode["userName"] + ' teamName: ' + $scope.team.teamName);
            })
            .error(function(err) {
                console.log('NOT A REAL TEAM!' + err);
            });
        };
});