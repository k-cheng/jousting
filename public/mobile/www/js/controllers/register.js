angular.module('app').controller('RegisterCtrl', function($scope, $auth, $location) {

$scope.submit = function () {

  console.log('test',$scope.user);
    $auth.signup({
      fullName: $scope.user.fullName,
      userName: $scope.user.userName,
      email: $scope.user.email,
      password: $scope.user.password
    })
      .then(function (res) {
        $auth.setToken(res);
        $location.path('gauntlet');
        console.log('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '! Please email activate your account in the next several days.');
      })
      .catch(function (err) {
        console.log('warning', 'Unable to create account :(', err.message);
      });
  };

});