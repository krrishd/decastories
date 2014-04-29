var app = angular.module('decaStories', ['ui.router', 'snap']);
var api = 'http://iamdeca.herokuapp.com';
app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url : '/',
			templateUrl : 'views/home.html',
			controller : homeCtrl
		})
		
		.state('state', {
			url : '/state/:state',
			templateUrl : 'views/state.html',
			controller : stateCtrl
		})

		.state('story', {
			url : '/story/:id',
			templateUrl : 'views/story.html',
			controller : storyCtrl
		})

		.state('new', {
			url : '/new',
			templateUrl : 'views/new.html',
			controller : newCtrl
		});

		$urlRouterProvider.otherwise('/');
});

function mainCtrl($scope, $http) {
	$http.get(api + '/api/states').success(function(data) {
		$scope.states = data;
	});
}

function homeCtrl($scope, $http) {
	$http.get(api + '/api/stories').success(function(data) {
		$scope.stories = data.reverse();
	});
}

function stateCtrl($scope, $http, $stateParams) {
	$http.get(api + '/api/states').success(function(data) {
		$scope.states = data;
	});
	function findState(abbr) {
		var theState = "";
		for(i=0; i<$scope.states.length; i++) {
			if ($scope.states[i].abbreviation == abbr) {
				theState = $scope.states[i].name;
			}
		};
		return theState;
	};
	$http.get(api + '/api/stories/' + $stateParams.state).success(function(data) {
		$scope.stories = data.reverse();
		if (data.length < 1) {
			alert('No stories yet!');
			window.location.hash = "#/";
		}
	});	
}

function storyCtrl($scope, $http, $stateParams) {
	$scope.storyId = $stateParams.id;
	$http.get(api + '/api/story/' + $scope.storyId).success(function(data) {
		$scope.story = data;
	});
}

function newCtrl($scope, $http) {	
	$scope.newStory = function() {
		$scope.payload = {
			name : $scope.name,
			state : $scope.state,
			chapter : $scope.chapter,
			title : $scope.title,
			content : $scope.content
		};
		$http.post(api + '/api/stories/new', $scope.payload)
			.success(function(data) {
				alert('Posted!');
				window.location.hash = '#/';
			})
			.error(function(err) {
				alert('Oops! Something went wrong');
			});
	};

	$http.get(api + '/api/states').success(function(data) {
		$scope.states = data;
	});
}
