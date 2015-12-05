angular.module('fitspiration.services', [])

/**
  * grabs the login page when the app starts and 
  * throws error when the credentials aren't correct
  */
.factory('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
/**
  * designed to get the newsfeed and refresh the feed 10 results at a time
  * until there are no more items
  */
.factory('PersonService', function($http){
	var BASE_URL = "http://api.randomuser.me/";
	var items = [];
	
	return {
		GetFeed: function(){
			return $http.get(BASE_URL+'?results=10').then(function(response){
				items = response.data.results;
				return items;
			});
		},
		GetNewUsers: function(){
			return $http.get(BASE_URL+'?results=2').then(function(response){
				items = response.data.results;
				return items;
			});
		},
		GetOldUsers: function(){
			return $http.get(BASE_URL+'?results=10').then(function(response){
				items = response.data.results;
				return items;
			});
		}
	};
})

/**
.factory('NewsfeedService', fucntion($http){
	var items = [];
	
	return{
		/* get a json response of post object from request url */ /**
		getPosts: function(){
			/* returns a promise
			then is used here because we want to save for further use */ /**
			return $http.get("https://jrg4017.github.io/newsfeed").then(function(response){
				items = response;
				return items; /* also returns a promise *//**
			}); 
		}
		
	}
})
*/
/**
  * gets the chat 
  */
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})



/**
.factory('Scoreboard', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var = [{
    id: 0,
    name: 'Taco',
    currentScore: '300'
  }, {
    id: 1,
    name: 'LadyLifts',
    currentScore: '400'
  }, {
    id: 2,
    name: 'E-Board',
    currentScore: '300'
  }, {
    id: 3,
    name: 'Burritos',
    currentScore: '350'
  }, {
    id: 4,
    name: 'Yoga Gals',
    currentScore: '200'
  }];

  return {
    all: function() {
      return team;
    },
    remove: function(teams) {
      team.splice(team.indexOf(teams), 1);
    },
    get: function(teamId) {
      for (var i = 0; i < team.length; i++) {
        if (team[i].id === parseInt(teamId)) {
          return team[i];
        }
      }
      return null;
    }
  };
})*/

/**
  * allows the camera plug in to be functional
  */
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}]);