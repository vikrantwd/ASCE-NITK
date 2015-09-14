AsceTools.controller('EventsOppCollCtrl', function($scope, $location,$routeParams,CrudService){

	$scope.cat = $routeParams.cat;
	$scope.misc.activetab = $scope.cat;
	if(!($scope.cat=='events' || $scope.cat=='opportunities' || $scope.cat== 'collaborate' || $scope.cat=='undefined')){
		$location.path('/404')
	}
	$scope.add = function(cat){
		$location.path('/events/'+$scope.cat+'/add');
	}
	$scope.edit = function(id){
		$location.path('/events/'+$scope.cat+'/add/'+id);
	}
	$scope.init = function(){
		if($scope.misc.uid==0){
			$location.path('/');
		}
		
		CrudService.all('events', {}).then(function(response){
			var temp = response.data.data;
			$scope.drafts = [];
			for(i=0;i<temp.length;i++){
				if(temp[i].subpageOf=="mainpage"||temp[i].subpageOf==$scope.cat)
					$scope.drafts.push(temp[i]);
			}
			console.log($scope.drafts);
		});
	}
	$scope.init();
	$scope.delete = function(id){
		CrudService.delete('events',id).then(function(response){
			alert("members deleted successfully");
		});
	}
});