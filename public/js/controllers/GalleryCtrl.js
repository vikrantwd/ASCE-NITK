AsceTools.controller('GalleryCtrl', function($scope, $location,$routeParams,$http,CrudService){


	$scope.misc.activetab = 'gallery';
	
	$scope.draft = {
		pics:[{
			link:'',
			title:'',
			about:{
				album:'',
				desc:'',
				date:''
			}
		}]
	};

	$scope.misc.activetab = 'gallery';

	$scope.add = function(){
		CrudService.add('gallery',$scope.draft).then(function(response){
			alert("pics saved successfully");
			$location.path('/gallery');
		});
	}
	$scope.init = function(){
		if($scope.misc.uid==0){
			$location.path('/');
		}

		CrudService.all('gallery', {}).then(function(response){
			$scope.drafts = response.data.data;
		});
	}
	$scope.update = function(id,index){
		CrudService.update('gallery',id,$scope.drafts[index]).then(function(response){
			alert("gallery saved successfully");
		});
	}
	$scope.delete = function(id){
		CrudService.delete('gallery',id).then(function(response){
			alert("gallery deleted successfully");
		});
	}

	$scope.init();
});