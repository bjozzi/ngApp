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
	    $scope.gifts = data;
	});

	$scope.remove = function(id){
		console.log(id)
		jsonBlob.delete({"id":id}, function(success){

		})
	}
});

app.controller("createCtrl", function($scope, jsonBlob,jsonBlobById, $routeParams,$location) {
	$scope.post={};
	$scope.tags=[];
	$scope.channels=[];
	if($routeParams.id !== undefined){
		jsonBlobById.get( {"id": $routeParams.id}, function(data) {
	    	$scope.post = data;
	    	var day = moment(data.scheduled);
	    	$scope.scheduled = day.toDate();
	    	$scope.tags=data.tags;
	    	$scope.channels=data.channels;
		});
	}	

	$scope.postForm = function(){
		$scope.post.tags=$scope.tags;
		$scope.post.channels=$scope.channels;
		$scope.post.scheduled=JSON.stringify($scope.scheduled);

		if($routeParams.id !== undefined){
			jsonBlob.put($scope.post, function(success){
				jsonBlob.get();
				$location.path('/');
			});	
		}else{
			$scope.post.id = getRandomId();
			jsonBlob.post($scope.post, function(success){
				jsonBlob.get();
				$location.path('/');
			});			
		}		
	}

	$scope.addNewTag = function() {
  	 	$scope.tags.push("");
	};
	$scope.addNewChannel = function() {
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
        		params: {},
        		headers: {'Accept': 'application/json;charset=UTF-8'},
        		isArray:true},
        	post: {
        		method:'POST',
        		headers: {'Accept': 'application/json;charset=UTF-8'},
        		isArray:false
        	},
        	put: {
        		method:'PUT',
        		headers: {'Accept': 'application/json;charset=UTF-8'},
        		isArray:false
        	},
        	delete: {
        		method:'DELETE',
        		headers: {'Accept': 'application/json;charset=UTF-8'},
        		isArray:false
        	}
    	}
    );
});

app.factory('jsonBlobById',
	function($resource){
    	return $resource("/api/gifts/:id", {}, 
    	{
        	get: {
        		method:'GET', 
        		params: {},
        		headers: {'Accept': 'application/json;charset=UTF-8'},
        		isArray:false
        	}
    	}
    );
});