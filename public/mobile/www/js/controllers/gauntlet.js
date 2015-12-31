angular.module('app').controller('GauntletCtrl', function($scope, $http, API_URL, $state, $location, $window) {

  var email = $window.localStorage.email;

  $http.post(API_URL + 'getTeamName', {
    email: email
  })
  .success(function(team) {
    $scope.userInTeam = !!team['teams'][0].teamName;
  });


});
 

