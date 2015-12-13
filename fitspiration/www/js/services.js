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
			
			/*for testing purposes, the password is all secret
			 * normally I'd change this so the password / username is encrypted
			 * and not out in plain code, but I wanted to focus on other features
			 */
            if ( (name == 'LadyLifts' || name == 'E-Board' ||
				  name == 'Taco' || name == 'Burritos')&& pw == 'secret') {
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
/*.factory('GetTeams', function($http){
	return {
		all: function(){
			return $http.get('js/data/RIT_WRFC.json').then(function(response){
				var teams = response;
				return teams;
			})
	};
})*/


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

/*
/**for getting local storage items
.factory('$localStorage', ['$window', function($window){
	return{
		set: function(key, value){
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue){
			$window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value){
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key){
			return JSON.parse($window.localStorage[key] || '{}');
		}
	}
}])
.factory('TeamService', function($http, $scope, $stateParams){
	return{
		all: function(){
			return $http.get('data/RIT_WRFC.json');
		},
		getHighest: function() {
			
			var highest = 0;
			var name = "";
			var id = 0;
			
			for(var i =0; i < teams.length; i++){
				if(teams[i].score > highest){
					highest = teams[i].score;
					name = teams[i].name;
					id = teams[i].id;
				}
			}
			var temp = [];
			temp['id'] = id;
			temp['score'] = highest;
			temp['name'] = name;
			return temp;
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