(function(){
  'use strict';

  angular.module('ebiz-kart')
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", routeConfig]);

  function routeConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('kart', {
        url: '/kart/play',
        templateUrl: 'js/components/kart/kart.html',
        controller: 'KartCtrl',
        controllerAs: 'kt'
      })
      .state('kart_driver', {
        url: '/kart/driver',
        templateUrl: 'js/components/kart/driver-selection/driver-selection.html',
        controller: 'DriverSelectionCtrl',
        controllerAs: 'dsc'
      })
      .state('about', {
        url: '/kart/about',
        templateUrl: 'js/components/kart/about/about.html'
      })
      .state('help', {
        url: '/',
        templateUrl: 'js/components/kart/help/help.html',
        controller: 'HelpCtrl',
        controllerAs: 'hc'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

  }
})();
