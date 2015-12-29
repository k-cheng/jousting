angular.module('app').controller('LoginCtrl', function($scope, $http, $auth, $state, $window) {
  
  $scope.submit = function() {
    $auth.login({
      userName: $scope.user.userName,
      password: $scope.user.password
    }).then(function(res) {
      $state.go('gauntlet');
      $window.localStorage.storage.setItem('userName', res.data.user.userName);

      var message = 'Thanks for coming back ' + res.data.user.userName + '!';
      if (!res.data.user.active)
        message = 'Just a reminder, please activate your account soon :)';

      console.log('success', 'Welcome', message);
    }).catch(handleError);
  };

function handleError(err) {
  console.log('warning', 'Something went wrong :(', err.message);
}

});