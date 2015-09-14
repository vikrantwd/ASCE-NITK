MembersGallery.controller('MembersController', function($scope, $location,AllService){

	$scope.init = function(){
		$scope.rep = [];
		$scope.faculties = [];
		$scope.executive = [];
		$scope.core = [];
		$scope.seniors = [];
		
		AllService.all('members', {}).then(function(response){
			$scope.drafts = response.data.data;
			for(var i=0;i<$scope.drafts.length;i++){
				if($scope.drafts[i].info.priority==1)
					$scope.core.push($scope.drafts[i])
				if($scope.drafts[i].info.priority==2)
					$scope.executive.push($scope.drafts[i])
				if($scope.drafts[i].info.priority==3)
					$scope.seniors.push($scope.drafts[i])
				if($scope.drafts[i].info.priority==4)
					$scope.faculties.push($scope.drafts[i])
			}
		});
		$scope.curr = 'core';
		$scope.rep = $scope.core;
	};

	$scope.init();
	
	$scope.showOfficers = function(){
		$scope.curr='core';
		$scope.rep = $scope.core;
	}

	$scope.showOthers = function(){
		$scope.curr='others';
		$scope.rep = $scope.executive;
	}

	$scope.showFaculties = function(){
		$scope.curr='faculties';
		$scope.rep = $scope.faculties;
	}

	$scope.showBatch = function(year){
		$scope.curr='seniors';
		$scope.rep = $scope.seniors;
		$scope.temp = [];
		for(i=0;i<$scope.seniors.length;i++){
			if($scope.seniors[i].info.batch==year){
				$scope.temp.push($scope.seniors[i]);
			}
		}
		$scope.rep = $scope.temp;
	}

	$scope.showRecruitment = function(){
		$scope.curr='recruit';
	}

	$scope.ShowJoin = function(){
		$scope.curr='join';
	}

});