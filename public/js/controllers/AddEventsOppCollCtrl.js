AsceTools.controller('AddEventsOppCollCtrl', function($scope, $location,$routeParams,CrudService){
	

	$scope.cat = $routeParams.cat;
	$scope.id = $routeParams.id;
	$scope.misc.activetab = $scope.cat;
	$scope.options = ['mainpage','events','opportunities','collaborate'];
	
	$scope.addMoreImages = function(){
		$scope.draft.imagelink.push({imagedesc:{title:'',left:'',right:'',desc:'',stype:'',clink:''},link:''});
	};
	$scope.DeleteImages = function(number){
		$scope.draft.imagelink.splice(number,1);
	}
	$scope.addMoreDesc = function(){
		$scope.draft.subdesc.push({subtitle:'',subdescription:'',subimage:''});
	}
	$scope.DeleteDesc = function(number){
		$scope.draft.subdesc.splice(number,1);
	}
	$scope.init = function(){
		if($scope.misc.uid==0){
			$location.path('/');
		}

		if($scope.id){
			CrudService.find('events',$scope.id).then(function(response){
				$scope.draft = response.data;
			});	
		}else{
			$scope.draft={
				page:'',
				subpageOf:'',
				title:'',
				maindesc:'',
				subdesc:[{subtitle:'',subdescription:'',subimage:''}],
				imagelink:[{imagedesc:{title:'',left:'',right:'',desc:'',stype:'',clink:''},link:''}],
				bannerimage:'',
				bannerimage2:''
			}
		}
	}
	$scope.init();
	$scope.save = function(){
		if($scope.id){
			CrudService.update('events',$scope.id,$scope.draft).then(function(response){
				alert("events updated successfully");
			});
		}else{
			CrudService.add('events',$scope.draft).then(function(response){
				$location.path('/events');
				alert("event saved successfully");
			});
		}
	}
	$scope.text = $scope.id?'update':'Save';
});