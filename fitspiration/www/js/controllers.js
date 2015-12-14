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
  //scope variables
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

/**
  * in charge of setting the necessary team information for the team page
  * also sets the local storage org & team values for use
  */
.controller('TeamCtrl', function($http, $scope, JSONService){
	$scope.isAndroid = ionic.Platform.isAndroid();
	//convert to all caps & with _ instead of spaces
	var org = JSONService.getAllCaps(window.localStorage['org']);
	//get the associated team data and set it as $scope.team
	var promise = JSONService.getTeamData(org);
	promise.success( function(data){
		var teamName = window.localStorage['team'];
		//save the current team name
		for(var i = 0; i < data.length; i++){
			if(data[i]['name'] == teamName){
				$scope.team = data[i];
			}
		}
	});
})

/**
  * responsible for grabbing all team scores for the scoreboard
  * also grabs the highest score and showcases it
  */
.controller('ScoreboardCtrl', function($scope, $http, JSONService){
	$scope.isAndroid = ionic.Platform.isAndroid();
	//convert to all caps & with _ instead spaces
	var org = JSONService.getAllCaps(window.localStorage['org']);
	//grab highest score
	var promise = JSONService.getTeamData(org);
	promise.success( function(data){
		//set the scope for the scores
		$scope.scores = data;
		//get the highest score
		var teams = data;
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
.controller('LoginCtrl', function($scope, LoginService, JSONService, $ionicPopup, $state) {
    $scope.data = {};
 
 
    $scope.login = function() {
		var promise = JSONService.getOrgData();
		promise.success(function(data){
			var verify = LoginService.verifyLogin($scope.data.username, $scope.data.password, $scope.data.org, data);
			
			LoginService.loginUser(verify).success(function(data) {
				//save the team name for showing team data in local storage
				window.localStorage['org'] = $scope.data.org;
				window.localStorage['team'] = $scope.data.username;
				//change to dash
				$state.go('tab.dash');
			}).error(function(data) {
				alertPopup = $ionicPopup.alert({
					title: 'Login failed!',
					template: 'Your username or password was incorrect. Please try again.'
				});
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

