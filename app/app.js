'use strict';

angular.module('mapComponent', [
  'ngAnimate',
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'angular-uuid',
  'mapComponent.services',
  'mapComponent.components',
  'mapComponent.demo'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/mapComponent/demo'});
}]);
