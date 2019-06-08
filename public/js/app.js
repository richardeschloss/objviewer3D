'use strict';

// Declare app level module which depends on filters, and services
angular.module('ObjViewer3D', [
  'ngRoute',
  'ObjViewer3D.animations',
  'ObjViewer3D.filters',
  'ObjViewer3D.services',
  'ObjViewer3D.directives',
  'ObjViewer3D.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/', {templateUrl: "partials/homeView.html", controller: 'HomeController'});
}]);
