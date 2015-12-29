angular.module('app').controller('LogoutCtrl', function($scope, $auth, $state, $location, $window) {

  $scope.logout = function() {
    $auth.logout()
    .then(function() {
      var storage = $window.localStorage;
      storage.removeItem('userName');
      storage.removeItem('team');
      $state.go('home');
      // $location.path('/');
    });
  };

});