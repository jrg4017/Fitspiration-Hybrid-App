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
  
  /* gets the feed and items*/
  if(window.localStorage[window.localStorage['org'] +"-newsfeed.json"] == null){ //if null load it
	PersonService.GetNewsfeedData(); //load the data
  } //load the data into the newsfeed
	
	$scope.items = PersonService.GetFeed();
  
  /*refreshes the feed when called and gets new items */
  $scope.refresh = function(){
	$scope.items = PersonService.GetFeed();
  };
  
	$scope.addItem = function() {
		$state.go('upload-post');
	};
  
  /*checks for new items every 20 seconds and loads it into the newItems array */
   var CheckNewItems = function(){
		$timeout(function(){$scope.items = PersonService.GetFeed();},200000);
   }
  
  CheckNewItems();
})



.controller('UploadPostCtrl', function($scope, $state, $ionicPopup, JSONService, Camera){
	$scope.data = {};
	//goes back to the newsfeed if clicked
	$scope.back = function(){
		$state.go('tab.dash');
	}
	$scope.lastPhoto = ''; //default
	$scope.getPhoto = function() { //gets the photo if camera button clicked
    console.log('Getting camera');
    Camera.getPicture({
      quality: 75,
      allowEdit : true,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: true
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });
	}
  //adds item to the newsfeed array
  $scope.addItem = function(){
	  if(document.getElementById("textarea").value == ""){
		  alertPopup = $ionicPopup.alert({
			title: 'Oh no! We can\'t accept this.',
			template: 'Please at least enter description to post!', 
			cssClass: 'button-theme-color'
		});
	  }else{//add to feed
		if($scope.lastPhoto == ''){ //get what's in the url instead if something is there
			$scope.lastPhoto = $scope.data.imageurl;
		}
		  JSONService.addPostToFeed(window.localStorage['org'], $scope.lastPhoto,
		  $scope.data.caption, window.localStorage['team']);
		  $state.go('tab.dash');

  }}
  
  
	
})

.controller('UploadChallengeCtrl',function($scope, $state, $ionicPopup, JSONService){
	$scope.data = {};
	
	$scope.isAndroid = ionic.Platform.isAndroid();
	$scope.back = function(){
		$state.go('tab.challenge');
	}
	var org = window.localStorage['org'];
	$scope.addItem = function(){
		var ytube = $scope.data.youtube; //get the data on click
		var bool = validYouTube(ytube); //validate it's a link
		if(!bool){
			alertPopup = $ionicPopup.alert({
				title: 'Oh no! We can\'t accept this',
				template: 'We only take YouTube links right now. So please post a link from YouTube',
				cssClass: "button-theme-color"
			});
		}else if(window.localStorage[window.localStorage['team'] + '-alert'] == 'y'){ //popup alert
			alertPopup = $ionicPopup.alert({
				title: 'Submission already received!',
				template: 'Looks like your team already submitted to this challenge!',
				cssClass: "button-theme-color"
			});
			$state.go('tab.challenge');//go back to the challenge page
		}else{//all is well :)
			var promise = JSONService.getOrgData();
			promise.success(function(data){
				for(var i =0; i < data.length; i++){
					if(data[i]['orgName'] == window.localStorage['org']){	
						var arr = {
						"imageurl" : "img/ic_play_arrow.png", 
						"title":"Challenge " + data[i]['challenge'][0]['number'], 
						"response":"Your Team uploaded a video"};
						//add it to the team history
						var data = JSONService.addToTeamHistory(org, window.localStorage['team'], arr);
					}
			}});
		
			$state.go('tab.team');//go back to team page to show output
		}
		
	}
})

.controller('ChallengeCtrl', function($scope, $state, JSONService){
	$scope.isAndroid = ionic.Platform.isAndroid();
	$scope.addItem = function() {
		$state.go('upload-challenge'); 
	}
	//get the data for the current challenge for the organization
	var promise = JSONService.getOrgData();
	promise.success(function(data){
		for(var i =0; i < data.length; i++){
			if(data[i]['orgName'] == window.localStorage['org']){
				var temp = {
					"number": data[i]['challenge'][0]['number'],
					"duedate":data[i]['challenge'][0]['duedate'],
					"description": data[i]['challenge'][0]['description'],
					"points" : data[i]['challenge'][0]['points']
				};
				
				$scope.challenge =  temp;
			}
		}
	});
})

/**
  * in charge of setting the necessary team information for the team page
  * also sets the local storage org & team values for use
  */
.controller('TeamCtrl', function($http, $scope, JSONService){
	$scope.isAndroid = ionic.Platform.isAndroid();
	var org = window.localStorage['org'];
	//get the associated team data and set it as $scope.team
	var data = JSONService.getTeamData(org);
	var teamName = window.localStorage['team'];
	//save the current team name
	for(var i = 0; i < data.length; i++){
		if(data[i]['name'] == teamName){
			$scope.team = data[i];
		}
	}
})

/**
  * responsible for grabbing all team scores for the scoreboard
  * also grabs the highest score and showcases it
  */
.controller('ScoreboardCtrl', function($scope, $http, ScoreBoardService){
	$scope.isAndroid = ionic.Platform.isAndroid();
	//set the scope for the scores	
	$scope.scores = ScoreBoardService.all();
	//get the highest score
	$scope.highest = ScoreBoardService.getHighest($scope.scores);
})

/**
  * gets the log in and throws ror if incorrect, goes to app
  */
.controller('LoginCtrl', function($scope, LoginService, JSONService, $ionicPopup, $state) {
    $scope.data = {};

	//if item is in local storage, preload into the form
	var org = window.localStorage['org'];
	var team = window.localStorage['team'];
	if(org != null && team != null){
		$scope.data.org = org;
		$scope.data.username = team;
	}

    $scope.login = function() {
		var promise = JSONService.getOrgData();
		promise.success(function(data){
			var verify = LoginService.verifyLogin($scope.data.username, $scope.data.password, $scope.data.org, data);
			
			LoginService.loginUser(verify).success(function(data) {
				//save the team name for showing team data in local storage
				window.localStorage['org'] = JSONService.getAllCaps($scope.data.org);
				window.localStorage['team'] = $scope.data.username;
				//sorta hacky - load the information in local storage
				var n = window.localStorage['org'];
				if(window.localStorage[n + ".json"] == null){
				window.localStorage[n + ".json"] = JSONService.saveJSON(n); }
				//change to dash
				$state.go('tab.dash');
			}).error(function(data) {
				alertPopup = $ionicPopup.alert({
					title: 'Login failed!',
					template: 'Your username or password was incorrect. Please try again.',
					cssClass: "button-theme-color"
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

