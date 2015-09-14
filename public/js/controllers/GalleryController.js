MembersGallery.controller('GalleryController', function($scope, $location,AllService){
	$scope.pics = [];

	$scope.init = function(){
		$scope.images = {};
		$scope.temp = {};
		$scope.side = [];
		AllService.all('gallery', {}).then(function(response){
			$scope.drafts = response.data.data;
			for(var i=0;i<$scope.drafts.length;i++){
				if($scope.temp.hasOwnProperty($scope.drafts[i].pics.about.album)&&$scope.images.hasOwnProperty($scope.drafts[i].pics.about.album)){
					$scope.temp[$scope.drafts[i].pics.about.album].push($scope.drafts[i]);
					$scope.images[$scope.drafts[i].pics.about.album].push({title:$scope.drafts[i].pics.title, date:$scope.drafts[i].pics.about.date, thumb: $scope.drafts[i].pics.link, img: $scope.drafts[i].pics.link, description: $scope.drafts[i].pics.about.desc})
				}
				else{
					$scope.temp[$scope.drafts[i].pics.about.album]=[];
					$scope.temp[$scope.drafts[i].pics.about.album].push($scope.drafts[i]);
					$scope.images[$scope.drafts[i].pics.about.album] = [];
					$scope.images[$scope.drafts[i].pics.about.album].push({title:$scope.drafts[i].pics.title, date:$scope.drafts[i].pics.about.date, thumb: $scope.drafts[i].pics.link, img: $scope.drafts[i].pics.link, description: $scope.drafts[i].pics.about.desc})
				}
			}
			console.log($scope.temp)
			for(var key in $scope.temp) {
				$scope.side.push(key);
			}
			$scope.curr = $scope.side[0];
			console.log($scope.pics)
		});
	};
	$scope.init();
	
	$scope.showAlbum = function(name){
		$scope.curr=name;
	}

	$scope.images = [
      {thumb: 'images/1.jpg', img: 'images/1.jpg'},
          {thumb: 'images/thumbs/2.jpg', img: 'images/2.jpg'},
          {thumb: 'images/thumbs/3.jpg', img: 'images/3.jpg'},
          {thumb: 'images/thumbs/4.jpg', img: 'images/4.jpg'},
          {thumb: 'images/thumbs/5.jpg', img: 'images/5.jpg'},
          {thumb: 'images/thumbs/6.jpg', img: 'images/6.jpg'}
    ];
});