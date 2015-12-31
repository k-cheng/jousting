angular.module('app.controllers', ['ionic', 'ngCordova'])

.controller('gauntletCtrl', function($scope) {

})

.controller('theTeamCtrl', function($scope) {

})

.controller('ImageController', function($scope, $http, $timeout, $cordovaCamera, API_URL, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {

  var userName = window.localStorage.userName;

  $scope.takePicture = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = 'data:image/jpeg;base64,' + imageData;
      console.log("client " + $scope.imgURI);

      $http.post(API_URL + 'completeChallenge', {
          userName: userName,
          challengeName: 'selfieChallenge',
          comment: 'completed',
          // submission: $scope.imgURI,
          submission: imageData,
          contentType: 'image/jpeg'
        })
        .error(function(err) {
          console.log('Already sumitted challenge. ' + err);
        });

    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

});
