angular.module('app').controller('LogoutCtrl', function($scope, $auth, $location, $window) {

  $scope.logout = function() {
    $auth.logout()
    .then(function() {
      $window.localStorage.removeItem('userName');
      $location.path('/');
    });
  };

});