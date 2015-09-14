AsceTools.controller('MembersCtrl', function($scope, $location,$routeParams,$http,CrudService){


	$scope.misc.activetab = 'members';

	$scope.add = function(){
		CrudService.add('members',$scope.draft.info).then(function(response){
			$location.path('/members');
			alert("member saved successfully");
		});
		$scope.init();
	}
	$scope.init = function(){
		if($scope.misc.uid==0){
			$location.path('/');
		} 
		$scope.draft = {
				info:{
					name:'',
					batch:0,
					post:'',
					priority:'',
					pic:'',
					contact:{
						email:'',
						number:0
					}
				}
			};
		CrudService.all('members', {}).then(function(response){
			$scope.drafts = response.data.data;
		});
	}
	$scope.update = function(id,index){
		CrudService.update('members',id,$scope.drafts[index]).then(function(response){
			console.log($scope.drafts[index])
			console.log(id);
			alert("members saved successfully");
		});
	}
	$scope.delete = function(id){
		CrudService.delete('members',id).then(function(response){
			alert("members deleted successfully");
		});
	}

	$scope.init();
});