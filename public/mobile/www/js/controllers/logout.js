angular.module('app.controllers').controller('LogoutCtrl', function($scope, $http, $location) {

  $scope.logout = function() {
          $http.post('/logout')
          .success(function() {
              delete window.localStorage.user;
              console.log('Logout: Received OK response from server.');
              $location.url('/');
          })
          .error(function() {
              console.log('Logout: Received BAD response from server.');
          });
      };
});