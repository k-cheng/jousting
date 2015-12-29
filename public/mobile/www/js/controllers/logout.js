angular.module('app').controller('LogoutCtrl', function($scope, $auth, $state) {


  $auth.logout();
  $state.go('home');

  $scope.logout = function() {
    $auth.logout()
    .then(function() {
      var storage = $window.localStorage;
      storage.removeItem('userName');
      $location.path('/');
    });
  };

});