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
			else{ window.localStorage['alert'] ='y'; } //save to alert user
			
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