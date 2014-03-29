var app = angular.module('decaStories', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: homeCtrl
		})
		.when('/submit', {
			templateUrl: 'partials/submit.html',
			controller: submitCtrl
		});
});

function homeCtrl($scope, $http) {
	Tabletop.init({
		key: '0Ah4ub_GLQC5OdExES0hSaHNJRzIzS0FtNzZHdWRQQVE',
		callback: storeData,
		simpleSheet: true
	});
	
	function storeData(data, tabletop) {
		$scope.data = data.reverse();
		$scope.$apply();
	}
	var reloadData = function() {
		Tabletop.init({
			key: '0Ah4ub_GLQC5OdExES0hSaHNJRzIzS0FtNzZHdWRQQVE',
			callback: storeData,
			simpleSheet: true
		});
	
		function storeData(data, tabletop) {
			$scope.data = data.reverse();
			$scope.$apply();
		}	
	}
	setInterval(reloadData(), 30000);
}

function submitCtrl($scope) {
	document.querySelector('.submit').addEventListener('click', function(e) {
		e.preventDefault();
		if(document.querySelector('textarea').value.length > 800) {
			var excess = document.querySelector('textarea').value.length - 800;	
			alert('You have exceeded the word limit by ' + excess + ' words. Try cutting it down a bit, even though you love DECA so much :)');
		}
		else if(document.querySelector('.title').value.length > 40) {
			var excess =  document.querySelector('.title').value.length - 40;
			alert('Your story title exceeds the character limit by ' + excess + ' characters. Shorten it and try again :)');
		}
		else {
			alert('Submitted!');
			document.querySelector('form').submit();
		}
	});
}
