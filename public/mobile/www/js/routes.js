angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('register', {
    url: '/register',
    views: {
      'app-nav': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    views: {
      'app-nav': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('createATeam', {
    url: '/create-a-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/createATeam.html',
        controller: 'createATeamCtrl'
      }
    }
  })

  .state('joinATeam', {
    url: '/join-a-team',
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
    views: {
      'app-nav': {
        templateUrl: 'templates/roster.html',
        controller: 'rosterCtrl'
      }
    }
  })

  .state('gauntlet', {
    url: '/gauntlet',
    views: {
      'app-nav': {
        templateUrl: 'templates/gauntlet.html',
        controller: 'gauntletCtrl'
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

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/gauntlet');

});
