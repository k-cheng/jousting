angular.module('app').controller('GauntletCtrl', function($scope, $http, API_URL, $state, $location, $auth) {

  $http.get(API_URL + 'gauntlet').success(function (res) {
    // $state.go('gauntlet');
  }).error(function (err) {
    $state.go('home');
    console.log('warning', "Unable to load Gauntlet page", err.message);
  });

});
 
