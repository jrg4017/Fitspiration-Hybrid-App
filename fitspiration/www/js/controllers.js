angular.module('fitspiration.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

/**
  * to create and control an infinite scrollable newsfeed
  */
.controller('NewsfeedCtrl', function($scope, $timeout, PersonService, $state) {
  //scope vars
  $scope.isAndroid = ionic.Platform.isAndroid();
  $scope.items = [];
  $scope.newItems = [];
  $scope.page = 1;
  
  /* gets the feed and items*/
  PersonService.GetFeed().then(function(items){
	$scope.items = items;
  });
  /*refreshes the feed when called and gets new items */
  $scope.refresh = function() {
		if($scope.newItems.length > 0){
			$scope.items = $scope.newItems.concat($scope.items);
				
			//Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
			
			$scope.newItems = [];
		} else {
			PersonService.GetNewUsers().then(function(items){
				$scope.items = items.concat($scope.items);
				
				//Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
  };
  /* loads the next 10 items for the newsfeed*/
  $scope.loadMore = function(){
    PersonService.GetOldUsers().then(function(items) {
      $scope.items = $scope.items.concat(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
	
	$scope.addItem = function() {
		$state.go('upload');
	}
  };
  
  /*checks for new items every 20 seconds and loads it into the newItems array */
   var CheckNewItems = function(){
		$timeout(function(){
			PersonService.GetNewUsers().then(function(items){
				$scope.newItems = items.concat($scope.newItems);
			
				CheckNewItems();
			});
		},20000);
   }
  
  CheckNewItems();
})

.controller('UploadCtrl', function($scope){
	
})
.controller('ChallengeCtrl', function($scope){
	$scope.isAndroid = ionic.Platform.isAndroid();
})


.controller('TeamCtrl', function($http, $scope){
	$scope.isAndroid = ionic.Platform.isAndroid();
	
	$http.get('js/data/RIT_WRFC.json').success( function(response){
		var teamName = window.localStorage['team'];
		console.log(teamName);
		//save the current team name
		for(var i = 0; i < response.length; i++){
			console.log(response[i]['name']);
			if(response[i]['name'] == teamName){
				$scope.team = response[i];
				console.log('true');
			}
		}
	});
	
})

/**.controller('ScoreboardCtrl', function($scope, TeamService){

	
	console.log($scope.scores);
	/*var json = TeamService.all();
	window.localStorage['json'] = JSON.stringify(json);
	$scope.post = JSON.parse(window.localStorage['json'] || '{}');*/
	/**
	$scope.highest = TeamService.getHighest();
	$scope.isAndroid = ionic.Platform.isAndroid();
})*/

.controller('ScoreboardCtrl', function($scope, $http){
	$scope.isAndroid = ionic.Platform.isAndroid();
	
	$http.get('js/data/RIT_WRFC.json').success( function(response){
		//set the scope for the scores
		$scope.scores = response;
		//get the highest score
		var teams = response;
		var highest = 0;
			var name = "";
			var id = 0;
			
			for(var i =0; i < teams.length; i++){
				if(teams[i].score > highest){
					highest = teams[i]["score"];
					name = teams[i]["name"];
				id = teams[i]["id"];
				}
			}
			var temp = [];
			temp['id'] = id;
			temp['score'] = highest;
			temp['name'] = name;
			$scope.highest = temp;
	});
	
})

/**
  * gets the log in and throws ror if incorrect, goes to app
  */
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password, $scope.data.org).success(function(data) {
			//save the team name for showing team data in local storage
			window.localStorage['org'] = $scope.data.org;
			window.localStorage['team'] = $scope.data.username;
			//change to dash
			$state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Your username or password was incorrect. Please try again.'
            });
        });
    }
	/* grabs the register view if link is clicked */
	$scope.register = function() {
		$state.go('register');
	}
	
})

.controller('RegisterCtrl', function($scope){
	
	/* grabs the login view if link is clicked */
});

