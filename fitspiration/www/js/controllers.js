angular.module('fitspiration.controllers', [])

.controller('DashCtrl', function($scope) {})

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
.controller('NewsfeedCtrl', function($scope, $timeout, PersonService) {
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

.controller('ChallengeCtrl', function($scope){})

/**.controller('ScoreboardCtrl', function($scope, Scoreboard){
	$scope.team = Scoreboard.all();
  $scope.remove = function(team) {
    Scoreboard.remove(team);
  };
})*/

/**
.controller('TeamCtrl', function($scope, TeamService){
	$scope.team = TeamService.all();
})*/

.controller('TeamCtrl', function($scope){})

/**
  * gets the log in and throws ror if incorrect, goes to app
  */
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Your username or password was incorrect. Please try again.'
            });
        });
    }
})

//original
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

