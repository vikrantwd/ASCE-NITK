AsceTools.controller('MainCtrl', function($scope, $location,$routeParams,$http,CrudService){

	$scope.misc.activetab = 'mainpage'
	
	$scope.footerlist = {
		posts : ['']
	};
	$scope.addMoreNews = function(){
		$scope.draft.news.push('');
	}
	$scope.deleteNews = function(number){
		$scope.draft.news.splice(number,1);
	}
	$scope.addMoreMission = function(){
		$scope.draft.mission.push('');
	}
	$scope.deleteMission = function(number){
		$scope.draft.mission.splice(number,1);
	}
	$scope.addMoreEvents = function(){
		$scope.calender.events.push({when:'',desc:''});
	}
	$scope.deleteEvents = function(number){
		$scope.calender.events.splice(number,1);
	}
	$scope.addMoreFooter = function(){
		$scope.footerlist.posts.push('');
	}
	$scope.deleteFooter = function(number){
		$scope.footerlist.posts.splice(number,1);
	}
	$scope.save = function(){
		CrudService.update('mainpage',$scope.draft._id,$scope.draft).then(function(response){
			alert("mainpage saved successfully");
		});
		CrudService.update('calender',$scope.calender._id,$scope.calender).then(function(response){
			alert("calender saved successfully");
		});
		CrudService.update('recentposts',$scope.footerlist._id,$scope.footerlist).then(function(response){
			alert("recentpost saved successfully");
		});
	}
	$scope.init = function(){
		if($scope.misc.uid==0){
			$location.path('/');
		}

		CrudService.all('mainpage', {}).then(function(response){
			$scope.draft = response.data.data[0];
			console.log($scope.draft);
		});
		CrudService.all('recentposts', {}).then(function(response){
			$scope.footerlist = response.data.data[0]
			console.log($scope.footerlist);
		});
		CrudService.all('calender', {}).then(function(response){
			$scope.calender = response.data.data[0];		
				console.log(response);
		});
	}

	$scope.init();
});