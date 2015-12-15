/**
* gets the new json object
*/
function getNewJSON(data, team, historyArr){
	var newTS = [];
	var json = new Array();
	var cont;
	//grab the current team history array 
	for(var i =0; i < data.length; i++ ){
		var temp;
		if(data[i]['name'] == team){
			newTS = data[i]['teamhistory'];
								
			//verify has not been added
			cont = validateUpload(historyArr, newTS);
			//if true is returned (meaning is ok), then push the new historyArr
			if(cont) { newTS.push(historyArr); }
			else{ window.localStorage[window.localStorage['team'] + '-alert'] ='y'; } //save to alert team
			
			temp = {
					"id": data[i]['id'],
					"name": data[i]['name'],
					"score": data[i]['score'],
					"teamhistory": newTS
				};
				
				json.push(temp);
		}else{ json.push(data[i]); }	
	}
	//return everything
	return json;
}

/**
* validates whether it has been uploaded before
*/
function validateUpload(historyArr, newTS){
	for(var i = 0; i < newTS.length; i++){
		if( newTS[i]['title'] == historyArr['title'] &&
			newTS[i]['response'] == historyArr['response']){
			return false;
		}
	}
	
	return true; //never happens, proceed
}

/**
* validates url for the upload challenge
*/
function validYouTube(url) {
	if(url == 'undefined' || url == null) return false; //if empty return false
	//else match
	var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	return (url.match(p)) ? RegExp.$1 : false;
}


/**
* gets the current date for the newsfeed post
*/
function getPostDate(){
	var d = new Date();
	var month =  d.getMonth() + 1; //0-11
	var day = d.getDate(); //1-31
	var year = d.getFullYear();
	
	return "" + month + "/" + day + "/" + year;
}