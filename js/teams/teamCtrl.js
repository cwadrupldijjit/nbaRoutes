/* global angular */
var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService){
	$scope.teamData;
	
	function getTeamData() {
		teamService.getTeamData($routeParams.id).then(function(data){
			$scope.teamData = data;
			// console.log($scope.teamData);
		});
	};
	
	getTeamData();
	
	$scope.homeTeam = $routeParams.id;
	
	// var newGame = {};
	
	$scope.showNewGameForm = false;
	
	$scope.toggleGameForm = function() {
		if (!$scope.showNewGameForm) {
			$scope.showNewGameForm = true;
		} 
	};
	
	$scope.addGame = function() {
		var newGame = {
			// createdAt: new Date(),
			homeTeam: $scope.homeTeam,
			homeTeamScore: $scope.homeTeamScore,
			opponent: $scope.opponent,
			opponentScore: $scope.opponentScore,
			// updatedAt: new Date(),
			won: (this.homeTeamScore > this.opponentScore)
		}
		
		// console.log(newGame);
		teamService.addNewGame(newGame);
		
		setTimeout(function() {
			$scope.homeTeamScore = '';
			$scope.opponent = '';
			$scope.opponentScore = '';
		}, 200);
		
		$scope.showNewGameForm = false;
		
		getTeamData();
	};
});