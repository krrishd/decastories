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
		$scope.data = data;
		$scope.$apply();
	}
}

function submitCtrl($scope) {

}
