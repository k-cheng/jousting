angular.module('app').controller('LoginCtrl', function($scope, $http, $auth, $state) {
  
  $scope.submit = function() {
    $auth.login({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(res) {
      $state.go('gauntlet');
      var message = 'Thanks for coming back ' + res.data.user.email + '!';

      if (!res.data.user.active)
        message = 'Just a reminder, please activate your account soon :)';

      console.log('success', 'Welcome', message);
    }).catch(handleError);
  };

function handleError(err) {
  console.log('warning', 'Something went wrong :(', err.message);
}

});