/* global angular */
var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push('httpRequestInterceptor');
	
	//router here
	$routeProvider
		.when('/', {
			controller: 'homeCtrl',
			templateUrl: 'js/home/homeTmpl.html'
		})
		.when('/teams/:id', {
			controller: 'teamCtrl',
			templateUrl: 'js/teams/teamTmpl.html'
		})
		.otherwise({ redirectTo: '/' });
});