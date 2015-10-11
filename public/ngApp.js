 var app = angular.module("myapp", ['ngResource', 'ngRoute']);
         
app.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/create', {
		templateUrl: 'create.html',
		controller: 'createCtrl'
		})
		.when('/create/:id', {
		templateUrl: 'create.html',
		controller: 'createCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
});

app.controller("myCtrl", function($scope, jsonBlob) {
	$scope.helloTo = {};
	$scope.helloTo.title = "AngularJS";
	jsonBlob.get( function(data) {
		console.log(data);
	    $scope.gifts = data;

	});
});

app.controller("createCtrl", function($scope, jsonBlob, $routeParams) {
	$scope.create = "ello there";
	$scope.post={};
	$scope.tags=[];
	$scope.channels=[];
	console.log($routeParams.id);
	if($routeParams.id !== undefined){
		jsonBlob.get( function(data) {
	    	$scope.post = data[0];
	    	var day = moment(data[0].scheduled);
	    	$scope.scheduled = day.toDate();
	    	$scope.tags=data[0].tags;
		});
	}	

	$scope.postForm = function(){
		$scope.post.id = getRandomId();
		console.log($scope.post);
		console.log($scope.post.id);
		$scope.post.tags=$scope.tags;

		//jsonBlob.post($scope.post);		
	}

	$scope.addNewTag = function() {
  	 	$scope.tags.push("");
	};
	$scope.addNewChannel = function() {
		console.log($scope.channels);
  	 	$scope.channels.push({"name": "", "id": getRandomId() });
	};

	function getRandomId(){
		return Math.random().toString(36).substring(7);
	}
});

app.factory('jsonBlob',
	function($resource){
    	return $resource("/api/gifts", {}, 
    	{
        	get: {
        		method:'GET', 
        		params:{}, 
        		headers: {'Accept': 'application/json;charset=UTF-8'},
        		isArray:true},
        	post: {
        		method:'POST',
        		params:{},
        		headers: {'Accept': 'application/json;charset=UTF-8'},
        		isArray:false
        	}
    	}
    );
});