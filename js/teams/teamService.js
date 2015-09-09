var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	this.addNewGame = function(gameObject) {
		var url = 'https://api.parse.com/1/classes/' + gameObject.homeTeam;
		
		// if (parseInt(gameObject.homeTeamScore) > parseInt(gameObject.opponentScore)) {
		// 	gameObject.won = true;
		// } else {
		// 	gameObject.won = false;
		// }
		
		$http({
			method: 'POST',
			url: url,
			data: gameObject
		});
	};
	
	this.getTeamData = function(team) {
		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team;
		
		deferred.resolve($http({
			method: 'GET',
			url: url
		}).then(function(data) {
			var results = data.data.results;
			var wins = 0;
			var losses = 0;
			
			results.forEach(function(val, i) {
				if (val.won) {
					wins++;
				} else {
					losses++;
				}
			});
			// console.log(results);
			results.wins = wins;
			results.losses = losses;
			
			return results;
		}));
		
		return deferred.promise; 
	};
});