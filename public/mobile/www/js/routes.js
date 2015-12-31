angular.module('app')

.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  
  $stateProvider

  .state('app', {
    abstract: true,
    templateUrl: 'templates/sideMenu.html',
    controller: 'SideMenuCtrl',
  })

  .state('app.register', {
    url: '/register',
    views: {
      'app-nav': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    },
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'app-nav': {
        templateUrl: 'templates/login.html'
      }
    },
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })

  .state('app.logout', {
    url: '/logout'
  })

  .state('app.createTeam', {
    cache: false,
    url: '/create-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/createteam.html',
        controller: 'CreateTeamCtrl'
      }
    },
    resolve: {
      loginRequired: loginRequired
    }
  })

  .state('app.joinTeam', {
    url: '/join-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/jointeam.html',
        controller: 'JoinTeamCtrl'
      }
    },
    resolve: {
      loginRequired: loginRequired
    }
  })

  .state('app.home', {
    url: '/',
    views: {
      'app-nav': {
        templateUrl: 'templates/home.html',
      }
    }
  })

  .state('app.roster', {
    cache: false,
    url: '/roster',
    views: {
      'app-nav': {
        templateUrl: 'templates/roster.html',
        controller: 'RosterCtrl'
      }
    },
    resolve: {
      loginRequired: loginRequired
    }
  })

  .state('app.gauntlet', {
    cache: false,
    url: '/gauntlet',
    views: {
      'app-nav': {
        templateUrl: 'templates/gauntlet.html',
        controller: 'GauntletCtrl'
      }
    },
    resolve: {
      loginRequired: loginRequired
    }
  })

  .state('app.theTeam', {
    url: '/the-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/theteam.html',
        controller: 'theTeamCtrl'
      }
    },
    resolve: {
      loginRequired: loginRequired
    }
  })

  .state('app.submissions', {
    url: '/submissions',
    views: {
      'app-nav': {
        templateUrl: 'templates/submissions.html',
        controller: 'SubmissionCtrl'
      }
    },
    resolve: {
      loginRequired: loginRequired
    }
  })

  .state('app.challenges', {
    url: '/challenges',
    views: {
      'app-nav': {
        templateUrl: 'templates/selfiechallenge.html'
      }
    },
    resolve: {
      loginRequired: loginRequired
    }
  });

  $urlRouterProvider.otherwise('/');  

  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }
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

  if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
    $authProvider.cordova = true;
    commonConfig.redirectUri = API_URL;
  }

  $authProvider.loginUrl = API_URL + 'login';

  $authProvider.signupUrl = API_URL + 'register';

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '756912801119797',
    url: API_URL + 'auth/facebook'
  }));

})

.constant('API_URL', 'http://localhost:8000/');