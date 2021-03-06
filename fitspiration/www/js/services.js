angular.module('fitspiration.services', [])

.factory('JSONService', function($http){
	return {
		saveJSON: function(org){
			var path = "js/data/" + org + ".json";
			$http.get(path).success(function(data){
				window.localStorage[org + '.json'] = JSON.stringify(data); //save into localStorage
			})
		},
		getOrgData: function(){
			return $http.get('js/data/organizations.json').success(function(data){
				return data
			});
		}, 
		getTeamData: function(org){
			var data = window.localStorage[org + '.json']; //grab up to date data
			return JSON.parse(data);
		},
		getAllCaps: function(name){
			//grab all caps of the name in question and then get the teams for the org
			return name.split(' ').join('_').toUpperCase();
			
		},
		addTeam: function(org, teamName){
			
		},
		addOrg: function(org, teamName){
	
		},
		addToTeamHistory(org, team, historyArr){
				var data = JSON.parse(window.localStorage[org + '.json']);
				var json = getNewJSON(data, team, historyArr);
				//save the new json 
				window.localStorage[org + '.json'] = JSON.stringify(json);			
		},
		addPostToFeed(org, img, caption, team){
			var path = org + "-newsfeed.json";//the path
			var data = JSON.parse(window.localStorage[path]);
			
			var objs = {
				"image": img,
				"caption": caption,
				"date": getPostDate(),
				"team": team
			};
			
			data.push(objs);
			
			window.localStorage[path] = JSON.stringify(data);
		}
	};
})

/**
  * grabs the login page when the app starts and 
  * throws error when the credentials aren't correct
  */
.factory('LoginService', function($q, $http, $window, JSONService) {
    return {
        verifyLogin: function(name, pw, org, orgFile) {
			var orgTeams = [];
			var allCapsOrg = JSONService.getAllCaps(org);
			
			for(var i = 0; i < orgFile.length; i++){
				if(orgFile[i]['orgName'] == allCapsOrg){
					orgTeams = orgFile[i]['teams'];
				}
			}
			/*for testing purposes, the password is all secret
			* normally I'd change this so the password / username is encrypted
			* and not out in plain code, but I wanted to focus on other features
			*/
			var bool = false;
			for(i = 0; i < orgTeams.length; i++){
				if(name == orgTeams[i]['name']){
					bool = true;
				}
			}
			
			if(bool == true && pw == 'secret'){ return 'true';
			}else{ return 'false'; }
        },
		loginUser: function(verify) {
             var deferred = $q.defer();
             var promise = deferred.promise;

             if (verify == 'true') {
                 deferred.resolve('Welcome '  +  name  + '!');
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
    };
})
/**
  * designed to get the newsfeed and refresh the feed 10 results at a time
  * until there are no more items
  */
.factory('PersonService', function($http, JSONService){
	var newsfeed = window.localStorage['org'] +"-newsfeed";

	return {
		GetNewsfeedData: function(){
			//load newsfeed
			JSONService.saveJSON(newsfeed);
			var temp = window.localStorage[newsfeed +".json"]; //just in case
			try{ //catch this to keep from error from being thrown
				temp = JSON.parse(temp);
			}catch($e){}
		
		},
		GetFeed: function(){
			var temp = window.localStorage[newsfeed +".json"]; //just in case
			temp = JSON.parse(temp);
			var data = []; //prints it out with most recent first
			for(var i = (temp.length-1); i > 0; i--){
				data.push(temp[i]);
			}
			return data; //parse the data
		}
	};
})

.factory('ScoreBoardService', function(JSONService){
	return {
		all: function(){
			var org = window.localStorage['org'];
			return JSONService.getTeamData(org);
		},
		getHighest: function(teams){
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
			return temp;
		}
	};
})



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