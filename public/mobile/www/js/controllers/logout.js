angular.module('app').controller('LogoutCtrl', function($scope, $auth, $state) {

  $auth.logout();
  $state.go('home');

});