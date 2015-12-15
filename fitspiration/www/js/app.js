// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('fitspiration', ['ionic', 'fitspiration.controllers', 'fitspiration.services', 'ngCookies'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: function(){
		if(ionic.Platform.isAndroid()){
		return 'templates/tabs-android.html';
		}
		return "templates/tabs.html";
	}
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-newsfeed.html',
        controller: 'NewsfeedCtrl'
      }
    }
  })
	
	.state('login', { //for when the app launches and needs a team log in
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
	})
	
	.state('register', { //launches if button is clicked
		url: '/register',
		templateUrl: 'templates/register.html',
		controller: 'RegisterCtrl'
	})
	
	.state('upload-post', { //launches if button is clicked on newsfeed
		url: '/upload-post',
		templateUrl: 'templates/upload-post.html',
		controller: 'UploadPostCtrl'
	})
	
	.state('upload-challenge', { //launches if button is clicked
		url: '/upload-challenge',
		templateUrl: 'templates/upload-challenge.html',
		controller: 'UploadChallengeCtrl'
	})
  
  .state('tab.challenge', {
	  url: '/challenge',
	  views: {
		  'tab-challenge':{
			  templateUrl: 'templates/tab-challenge.html',
			  controller: 'ChallengeCtrl'
		  }
	  }
  })
  
  .state('tab.team', {
	  url: '/team',
	  views: {
		  'tab-team': {
			  templateUrl: 'templates/tab-team.html',
			  controller: 'TeamCtrl'
		  }
	  }
  })
  
  .state('tab.scoreboard',{
	  url: '/scoreboard',
	  views: {
		  'tab-scoreboard':{
			  templateUrl: 'templates/tab-scoreboard.html',
			  controller: 'ScoreboardCtrl'
		  }
	  }
  });
  
   /**.state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })*/
 
 
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
