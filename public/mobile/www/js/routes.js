angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })
        
      
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
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
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/gauntlet');

});