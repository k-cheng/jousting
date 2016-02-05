angular.module('app').controller('SubmissionCtrl', function($scope, $state, $http, $timeout, API_URL, $window) {
    
  $scope.imgURL = [];
  var email = window.localStorage.email;
  console.log("email "+email);
  
  $scope.teamInfo = {
    users: [],
    teamName: ''
  };

  var usersInTeam;
  $scope.challengesInTeam;

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

        var imgURL = [];

        for(var i = 0 ; i < usersInTeam.length ; i++){
          console.log(usersInTeam[i]['userName']);
          // $scope.imgURL.push(API_URL + 'getSubmissionInfo/' + usersInTeam[i]['userName'] + '/selfieChallenge');
          imgURL.push(API_URL + 'getSubmissionInfo/' + usersInTeam[i]['userName'] + '/selfieChallenge');
        }

        // for(var j = 0 ; j < imgURL.length ; j++){
        // $scope.$apply(function(){
          $scope.$evalAsync(function(){
            for(var j = 0 ; j < imgURL.length ; j++){
              // $scope.$apply(function(){
                $scope.imgURL.push(imgURL[j]);
                // $scope.imgURL;
                console.log("wtf "+$scope.imgURL);
              // });
            }
          });
        // });
        // }

      })
      .error(function(err) {
        console.log('Could not retrieve roster list ' + err);
      });

    })
    .error(function(err) {
      console.log('Could not retreive user info ' + err);
  });

});