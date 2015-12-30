angular.module('app').controller('LoginCtrl', function($scope, $http, $auth, $state, $location, $window) {
  
  $scope.submit = function() {
    $auth.login({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(res) {
      $location.path('gauntlet');
      
      var storage = $window.localStorage;

      storage.setItem('email', res.data.user.email);
      
      var message = 'Thanks for coming back ' + res.data.user + '!';
      if (!res.data.user.active)
        message = 'Just a reminder, please activate your account soon :)';

      console.log('success', 'Welcome', message);
    }).catch(handleError);
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(res) {
      $state.go('gauntlet');
      var storage = $window.localStorage;
      storage.setItem('email', res.data.user.email);
      console.log('success', 'Welcome', 'Thanks for coming back ' + res.data.user.displayName + '!');
    })
    .catch(handleError);
  }; 

function handleError(err) {
  console.log('warning', 'Something went wrong :(', err.message);
}

});