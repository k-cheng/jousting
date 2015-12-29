angular.module('app').controller('LogoutCtrl', function($scope, $auth, $location, $window) {

  $scope.logout = function() {
    $auth.logout()
    .then(function() {
      var storage = $window.localStorage;
      storage.removeItem('user');
      storage.removeItem('teams')
      $location.path('/');
    });
  };

});