var AsceTools;

(function() {

	AsceTools = angular.module('AsceCms', ['ngRoute', 'ngCookies', 'hc.marked','ngResource']);

	AsceTools.constant('APIConstants', {
		end_point: (function(env) {
			switch(env) {
				default : return 'http://localhost:3000/';
			}
		})(document.domain)
	});

})();

var MembersGallery;

(function() {

	MembersGallery = angular.module('MembersGallery', ['ngRoute', 'ngCookies', 'hc.marked','ngResource','jkuri.gallery']);

	MembersGallery.constant('APIConstants', {
		end_point: (function(env) {
			switch(env) {
				default : return 'http://localhost:3000/';
			}
		})(document.domain)
	});

})();

(function() {

	AsceTools.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/events/:cat', {
			templateUrl: '../views/adminevents.html',
		}).when('/events/:cat/add/', {
			templateUrl: '../views/addevents.html'
		}).when('/events/:cat/add/:id', {
			templateUrl: '../views/addevents.html'
		}).when('/mainpage', {
			templateUrl: '../views/mainpage.html'
		}).when('/members', {
			templateUrl: '../views/members.html'
		}).when('/gallery', {
			templateUrl: '../views/gallery.html'
		}).when('/events/:cat/:id', {
			templateUrl: '../views/addevents.html',
		}).when('/', {
			templateUrl: '../views/login.html',
		})
	}]);

})();

(function() {

	AsceTools.controller('AsceToolsController', function($scope,$window,$location,CrudService){
		$scope.misc = {
			activetab : 'mainpage'
		}
		if($window.sessionStorage['user'])
			$location.path('/mainpage')
		else
			$location.path('/')
		$scope.init = function(){
			$scope.doc = {
				username:'',
				password:''
			}
			$scope.misc.uid=$window.sessionStorage['user'];
		}
		
		$scope.init();

		$scope.auth = function(){
			CrudService.add('auth',$scope.doc).then(function(response){
					$window.sessionStorage['user'] = response.data.id;
					$scope.misc.uid=$window.sessionStorage['user'];
					$location.path('/mainpage')
				});
		}

		$scope.logout = function(){
			$window.sessionStorage['user'] = 0;
			$scope.misc.uid=$window.sessionStorage['user'];
			console.log($scope.misc.uid)
			$location.path('/')
		}

		$scope.misc.obj = {};
	});

	MembersGallery.service('AllService', function($http,$window) {
		return {
			all: function(type) {
				var $this = this;
				return $http.get('http://localhost:3000/api/' + type).then(function(data) {
					var response = data;
					return { status: 200, data: response };
				}, function(data) {
					alert('Error Getting  Lisitng - ' + JSON.stringify(data.data));
					return { status: data.status };
				});
			}
		}
	});

	AsceTools.service('CrudService', function($http,$window) {
		return {
			all: function(type) {
				var $this = this;
				return $http.get('http://localhost:3000/api/' + type).then(function(data) {
					var response = data;
					return { status: 200, data: response };
				}, function(data) {
					alert('Error Getting  Lisitng - ' + JSON.stringify(data.data));
					return { status: data.status };
				});
			},

			delete: function(type, id) {
				var $this = this;
				var uid =  $window.sessionStorage['user'];
				return $http.delete('http://localhost:3000/api/' + type + '/' + id + "/" +uid).then(function(data) {
					return { status: 200 };
				}, function(data) {
					alert('Error Deleting  - ' + JSON.stringify(data.data));
					return { status: data.status };
				});
			},

			add: function(type, item) {
				var $this = this;
				item.uid =  $window.sessionStorage['user'];
				return $http.post('http://localhost:3000/api/' + type, item).then(function(data) {
					var response = data.data;
					return { status: 201, data: response };
				}, function(data) {
					alert('Error Creating  - ' + JSON.stringify(data.data));
					return { status: data.status };
				});
			},

			update: function(type, id, item) {
				var $this = this;
				item.uid =  $window.sessionStorage['user'];
				return $http.put('http://localhost:3000/api/' + type + '/' + id, item).then(function(data) {
					var response = data.data;
					return { status: 200, data: response };
				}, function(data) {
					alert('Error Updating - ' + JSON.stringify(data.data));
					return { status: data.status };
				});
			},

			find: function(type, query) {
				var $this = this;
				return $http.get('http://localhost:3000/api/' + type + '/'+ query).then(function(data) {					
					var response = data.data;
					return { status: 200, data: response };
				}, function(data) {
					alert('Error Getting  Lisitng - ' + JSON.stringify(data.data));
					return { status: data.status };
				});
			}
		}

	});
})();
