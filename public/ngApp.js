 var app = angular.module("myapp", ['ngResource', 'ngRoute','ui.bootstrap']);
         
app.run(function($rootScope,jsonBlob){
	jsonBlob.get(function(data){
		$rootScope.gifts = data;	
	});
	 
});
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
		.when('/overview', {
			templateUrl:'overview.html',
			controller:'myCtrl'
		})
		.otherwise({
			redirectTo: '/overview'
		})
});

app.controller("myCtrl", function($scope,$rootScope, jsonBlob) {
	$scope.remove = function(id){
		jsonBlob.delete({"id":id}, function(success){
			$rootScope.gifts = jsonBlob.get();
		});
	}
});

app.controller("createCtrl", function($scope,$rootScope, jsonBlob,jsonBlobById, $routeParams,$location) {
	$scope.post={};
	$scope.tags=[];
	$scope.post.geo = {};
	$scope.post.geo.countries = [];
	$scope.channels=[];
	$scope.countries = countries;
	$scope.languages = languages;
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
				$rootScope.gifts = jsonBlob.get();
				$location.path('/');
			});	
		}else{
			$scope.post.id = getRandomId();
			jsonBlob.post($scope.post, function(success){
				$rootScope.gifts = jsonBlob.get();
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

	$scope.addCountry = function(country){
		$scope.post.geo.countries.push(country);
		$scope.selected = "";
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




var countries = [ 
{"value": "Afghanistan", "key": "AF"}, 
{"value": "Åland Islands", "key": "AX"}, 
{"value": "Albania", "key": "AL"}, 
{"value": "Algeria", "key": "DZ"}, 
{"value": "American Samoa", "key": "AS"}, 
{"value": "AndorrA", "key": "AD"}, 
{"value": "Angola", "key": "AO"}, 
{"value": "Anguilla", "key": "AI"}, 
{"value": "Antarctica", "key": "AQ"}, 
{"value": "Antigua and Barbuda", "key": "AG"}, 
{"value": "Argentina", "key": "AR"}, 
{"value": "Armenia", "key": "AM"}, 
{"value": "Aruba", "key": "AW"}, 
{"value": "Australia", "key": "AU"}, 
{"value": "Austria", "key": "AT"}, 
{"value": "Azerbaijan", "key": "AZ"}, 
{"value": "Bahamas", "key": "BS"}, 
{"value": "Bahrain", "key": "BH"}, 
{"value": "Bangladesh", "key": "BD"}, 
{"value": "Barbados", "key": "BB"}, 
{"value": "Belarus", "key": "BY"}, 
{"value": "Belgium", "key": "BE"}, 
{"value": "Belize", "key": "BZ"}, 
{"value": "Benin", "key": "BJ"}, 
{"value": "Bermuda", "key": "BM"}, 
{"value": "Bhutan", "key": "BT"}, 
{"value": "Bolivia", "key": "BO"}, 
{"value": "Bosnia and Herzegovina", "key": "BA"}, 
{"value": "Botswana", "key": "BW"}, 
{"value": "Bouvet Island", "key": "BV"}
];

var languages = [
  {
    "key": "ab",
    "value": "Abkhaz"
  },
  {
    "key": "aa",
    "value": "Afar"
  },
  {
    "key": "af",
    "value": "Afrikaans"
  },
  {
    "key": "ak",
    "value": "Akan"
  },
  {
    "key": "sq",
    "value": "Albanian"
  },
  {
    "key": "am",
    "value": "Amharic"
  },
  {
    "key": "ar",
    "value": "Arabic"
  },
  {
    "key": "an",
    "value": "Aragonese"
  },
  {
    "key": "hy",
    "value": "Armenian"
  },
  {
    "key": "as",
    "value": "Assamese"
  },
  {
    "key": "av",
    "value": "Avaric"
  },
  {
    "key": "ae",
    "value": "Avestan"
  },
  {
    "key": "ay",
    "value": "Aymara"
  },
  {
    "key": "az",
    "value": "Azerbaijani"
  },
  {
    "key": "bm",
    "value": "Bambara"
  },
  {
    "key": "ba",
    "value": "Bashkir"
  },
  {
    "key": "eu",
    "value": "Basque"
  },
  {
    "key": "be",
    "value": "Belarusian"
  }];