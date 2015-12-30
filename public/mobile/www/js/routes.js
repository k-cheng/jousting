angular.module('app')

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $stateProvider

  .state('register', {
    url: '/register',
    views: {
      'app-nav': {
        templateUrl: 'templates/register.html',
      }
    }
  })

  .state('login', {
    url: '/login',
    views: {
      'app-nav': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('logout', {
    url: '/logout'
    // views: {
    //   'app-nav': {
    //     templateUrl: 'templates/home.html',
    //   }
    // }
  })

  .state('createTeam', {
    url: '/create-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/createTeam.html',
        controller: 'CreateTeamCtrl'
      }
    }
  })

  .state('joinTeam', {
    url: '/join-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/joinTeam.html',
        controller: 'JoinTeamCtrl'
      }
    }
  })

  .state('home', {
    url: '/',
    views: {
      'app-nav': {
        templateUrl: 'templates/home.html',
      }
    }
  })

  .state('roster', {
    url: '/roster',
    views: {
      'app-nav': {
        templateUrl: 'templates/roster.html',
        controller: 'RosterCtrl'
      }
    }
  })

  // .state('selfieChallenge', {
  //   url: '/selfie-challenge',
  //   resolve: {
  //     loggedin: checkLoggedin
  //   },
  //   views: {
  //     'app-nav': {
  //       templateUrl: 'templates/selfieChallenge.html',
  //       controller: 'challengeCtrl'
  //     }
  //   }
  // })

  .state('gauntlet', {
    url: '/gauntlet',
    views: {
      'app-nav': {
        templateUrl: 'templates/gauntlet.html',
      }
    }
  })

  .state('theTeam', {
    url: '/the-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/theTeam.html',
        controller: 'theTeamCtrl'
      }
    }
  })

   .state('challenges', {
    url: '/challenges',
    views: {
      'app-nav': {
        templateUrl: 'templates/challenges.html',
        controller: 'ChallengesCtrl'
      }
    }
  })

  .state('selfieChallenge', {
    url: '/selfieChallenge',
    views: {
      'app-nav': {
        templateUrl: 'templates/selfieChallenge.html',
        controller: 'ImageController'
      }
    }
  });

  $urlRouterProvider.otherwise('/');  
})
.config(function($authProvider, API_URL) {
  var commonConfig = {
    popupOptions: {
      location: 'no',
      toolbar: 'no',
      width: window.screen.width,
      height: window.screen.height
    }
  };

  // if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
  //   $authProvider.cordova = true;
  //   commonConfig.redirectUri = 'http://localhost/';
  // }

  $authProvider.loginUrl = API_URL + 'login';

  $authProvider.signupUrl = API_URL + 'register';

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '756912801119797',
    url: API_URL + 'auth/facebook'
  }));

})

.constant('API_URL', 'http://localhost:8000/');


