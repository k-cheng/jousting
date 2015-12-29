angular.module('app.controllers', [])

.controller('createATeamCtrl', function($scope, $http, $location) {
    var userNode = JSON.parse(window.localStorage[satellizer_token]);
    console.log('userNode team is ', userNode.teams)
    console.log('scope user is', userNode.userName);
    $scope.team = {teamName: '', createdBy: ''};

    $scope.createTeam = function() {
        $http.post('/createTeam', {
            userName: userNode.userName,
            teamName: $scope.team.teamName
        })
        .success(function() {
            console.log($scope.team.teamName + ' has entered the gauntlet!');
            $location.url('/roster');
        })
        .error(function(err) {
            console.log('Team was not created :( '+err);
        })
        // get team name
    };
})

.controller('joinATeamCtrl', function($scope, $http, $location) {
    var userNode = JSON.parse(window.localStorage['user']);
    var listOfTeams = [];
    $scope.team = {teamName: '', createdBy: ''};
    //console.log('cory', $scope.team.teamName);
    console.log("userNode "+JSON.stringify(userNode));

    $http.get('/listAllTeams')
        .success(function(teams) {
            console.log("list of teams "+JSON.stringify(teams));
            //teams["teams"][i]["teamName"]
            for (var i = 0; i < teams['teams'].length; i++) {
                console.log("teamnames: "+teams['teams'][i]['teamName'])
                listOfTeams.push(teams['teams'][i]['teamName']);
            }
        });

    $scope.joinTeam = function() {
        console.log('In the Join Team function ' + $scope.team.teamName);
        $http.post('/joinTeam', {
            userName: userNode["userName"],
            teamName: $scope.team.teamName
        })
            .success(function() {
                $location.url('/roster')
                console.log('userName: ' + userNode["userName"] + ' teamName: ' + $scope.team.teamName)
            })
            .error(function(err) {
                console.log('NOT A REAL TEAM!' + err);
            })
        }
})

.controller('homeCtrl', function($scope) {

})

.controller('rosterCtrl', function($scope, $http) {
    var userNode = JSON.parse(window.localStorage['user']);
    console.log("in roster control");
    $scope.teamInfo = {users: [], teamName: ''}
    var teamUserIsIn;
    var usersInTeam;
    // $scope.getTeamName = function() {
        $http.post('/getTeamName', {
            userName: userNode["userName"]
        })
            .success(function(teams) {
                // console.log(JSON.stringify(teams));
                teamUserIsIn = teams["teams"];
                console.log("teamarray "+JSON.stringify(teamUserIsIn[0]['teamName']));
                // teamUserIsIn[index]["teamName"];
                $scope.teamInfo.teamName = teamUserIsIn[0]['teamName'];
                console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName)

                // NESTED HTTP POST REQUEST IS BAD PRACTICE! NEEDS REFACTORING!
                $http.post('/roster', {
                    teamName: teamUserIsIn[0]["teamName"]
                })
                    .success(function(users) {
                        // console.log("userarray "+JSON.stringify(users));
                        usersInTeam = users["users"];
                        $scope.teamInfo.users = usersInTeam;
                        // for (var i = 0; i < usersInTeam.length; i++) {
                        //     $scope.teamInfo.users.push(JSON.stringify(usersInTeam[i]['userName']));
                        //     console.log("userNameArray: "+$scope.teamInfo.users);
                        //     // usersInTeam[index]["userName"];
                        // }
                    })
                    .error(function(err) {
                        console.log('Could not retrive roster list ' + err)
                    })

            })
            .error(function(err) {
                console.log('Could not retrive user info ' + err);
            })
        // }
    //teamUserIsIn[index]["teamName"]

})

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

.controller('challenges', function($scope, $http) {
    var userNode = JSON.parse(window.localStorage['user']);
    console.log("in challenge control");
    $scope.teamInfo = {users: [], teamName: ''}
    $scope.challenges = [];
    var teamUserIsIn;
    var usersInTeam;

    $http.post('/getTeamName', {
        userName: userNode["userName"]
    })
        .success(function(teams) {
            teamUserIsIn = teams["teams"];
            console.log("teamarray "+JSON.stringify(teamUserIsIn[0]['teamName']));
            $scope.teamInfo.teamName = teamUserIsIn[0]['teamName'];
            console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName)

            $http.post('/listTeamChallenges', {
                teamName: teamUserIsIn[0]["teamName"]
            })
                .success(function(challenges) {
                    console.log(JSON.stringify(challenges));
                    for(var i = 0 ; i < challenges["challenges"].length ; i++){
                        $scope.challenges.push(challenges["challenges"][i]["challengeName"]);
                    }
                    console.log("challenge names "+JSON.stringify($scope.challenges));
                })
                .error(function(err) {
                    console.log('Could not retrive challenge list ' + err)
                });

        })
        .error(function(err) {
            console.log('Could not retrive team info ' + err);
        });
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
