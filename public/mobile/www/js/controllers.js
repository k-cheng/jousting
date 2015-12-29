angular.module('app.controllers', [])

// .controller('challengeCtrl', function($scope, $http) {
//     var userNode = JSON.parse(window.localStorage['user']);
//     var teamUserIsIn;
//     var challenges = [];
//     $scope.points;
//     $scope.challengeName;

//     $http.post('/getTeamName', {
//         userName: userNode["userName"]
//     })
//         .success(function(teams) {
//             teamUserIsIn = teams["teams"];
//         })
//         .error(function(err) {
//             console.log('Could not retrive user info ' + err);
//         });

//     $http.post('createChallenge', {
//         challengeName: $scope.challengeName,
//         teamName: teamUserIsIn[0]['_id'],
//         points: $scope.points
//     })
// })

.controller('gauntletCtrl', function($scope) {

})

.controller('theTeamCtrl', function($scope) {

})



.controller('ImageController', function($scope, $http, $timeout, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {
 
  $ionicPlatform.ready(function() {
    $timeout(function() {
        $scope.images = FileService.images();
        $scope.$apply();
    }, 0);
    
  });
 
  $scope.urlForImage = function(imageName) {
    var trueOrigin = cordova.file.dataDirectory + imageName;
    return trueOrigin;
  }
 
  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take photo' },
        { text: 'Photo from library' }
      ],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  }
 
  $scope.addImage = function(type) {
    $scope.hideSheet();
    ImageService.handleMediaDialog(type).then(function() {
      $scope.$apply();
    });
  }
  
  $scope.sendEmail = function() {
    if ($scope.images != null && $scope.images.length > 0) {
      var mailImages = [];
      var savedImages = $scope.images;
      if ($cordovaDevice.getPlatform() == 'Android') {
        // Currently only working for one image..
        var imageUrl = $scope.urlForImage(savedImages[0]);
        var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
        var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
        $cordovaFile.copyFile(namePath, name, cordova.file.externalRootDirectory, name)
        .then(function(info) {
          mailImages.push('' + cordova.file.externalRootDirectory + name);
          $scope.openMailComposer(mailImages);
        }, function(e) {
          reject();
        });
      } else {
        for (var i = 0; i < savedImages.length; i++) {
          mailImages.push('' + $scope.urlForImage(savedImages[i]));
        }
        $scope.openMailComposer(mailImages);
      }
    }
  }
 
  $scope.openMailComposer = function(attachments) {
    var bodyText = '<html><h2>My Images</h2></html>';
    var email = {
        to: 'some@email.com',
        attachments: attachments,
        subject: 'Devdactic Images',
        body: bodyText,
        isHtml: true
      };
 
    $cordovaEmailComposer.open(email).then(null, function() {
      for (var i = 0; i < attachments.length; i++) {
        var name = attachments[i].substr(attachments[i].lastIndexOf('/') + 1);
        $cordovaFile.removeFile(cordova.file.externalRootDirectory, name);
      }
    });
  }

  var userNode = JSON.parse(window.localStorage['user']);
  var teamUserIsIn;
  var challenges = [];
  $scope.points;
  $scope.challengeName;

  $http.post('/getTeamName', {
      userName: userNode["userName"]
  })
    .success(function(teams) {
      teamUserIsIn = teams["teams"];
    })
    .error(function(err) {
       console.log('Could not retrive user info ' + err);
    });

  $scope.createChallenge = function(){
    $http.post('/createChallenge', {
      points: $scope.points,
      teamName: teamUserIsIn[0]['teamName'],
      challengeName: $scope.challengeName
    })
      .success(function() {
        console.log('Challenge created!');
      })
      .error(function(err) {
        console.log('Could not create challenge ' + err);
      });
  }

});
