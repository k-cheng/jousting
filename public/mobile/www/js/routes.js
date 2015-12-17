angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Authentication: Will be Modularized Later
  //=========================================================================
  var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

  $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });
  //======================================================================

  $stateProvider

  .state('register', {
    url: '/register',
    views: {
      'app-nav': {
        templateUrl: 'templates/register.html',
        controller: 'authCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    views: {
      'app-nav': {
        templateUrl: 'templates/login.html',
        controller: 'authCtrl'
      }
    }
  })

  .state('createATeam', {
    url: '/create-a-team',
    resolve: {
      loggedin: checkLoggedin
    },
    views: {
      'app-nav': {
        templateUrl: 'templates/createATeam.html',
        controller: 'createATeamCtrl'
      }
    }
  })

  .state('joinATeam', {
    url: '/join-a-team',
    resolve: {
      loggedin: checkLoggedin
    },
    views: {
      'app-nav': {
        templateUrl: 'templates/joinATeam.html',
        controller: 'joinATeamCtrl'
      }
    }
  })

  .state('home', {
    url: '/home',
    views: {
      'app-nav': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('roster', {
    url: '/roster',
    resolve: {
      loggedin: checkLoggedin
    },
    views: {
      'app-nav': {
        templateUrl: 'templates/roster.html',
        controller: 'rosterCtrl'
      }
    }
  })

  .state('gauntlet', {
    url: '/gauntlet',
    resolve: {
      loggedin: checkLoggedin
    },
    views: {
      'app-nav': {
        templateUrl: 'templates/gauntlet.html',
        controller: 'gauntletCtrl'
      }
    }
  })

  .state('theTeam', {
    url: '/the-team',
    resolve: {
      loggedin: checkLoggedin
    },
    views: {
      'app-nav': {
        templateUrl: 'templates/theTeam.html',
        controller: 'theTeamCtrl'
      }
    }
  })

   .state('challenges', {
    url: '/challenges',
    resolve: {
      loggedin: checkLoggedin
    },
    views: {
      'app-nav': {
        templateUrl: 'templates/challenges.html',
        controller: 'challenges'
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
