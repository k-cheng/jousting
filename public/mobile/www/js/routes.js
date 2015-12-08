angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'authCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'authCtrl'
  })

  .state('createATeam', {
    url: '/create-a-team',
    templateUrl: 'templates/createATeam.html',
    controller: 'createATeamCtrl'
  })

  .state('joinATeam', {
    url: '/join-a-team',
    templateUrl: 'templates/joinATeam.html',
    controller: 'joinATeamCtrl'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('roster', {
    url: '/roster',
    templateUrl: 'templates/roster.html',
    controller: 'rosterCtrl'
  })

  .state('gauntlet', {
    url: '/gauntlet',
    templateUrl: 'templates/gauntlet.html',
    controller: 'gauntletCtrl'
  })

  .state('theTeam', {
    url: '/the-team',
    templateUrl: 'templates/theTeam.html',
    controller: 'theTeamCtrl'
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/gauntlet');

});
