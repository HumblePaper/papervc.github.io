import store from '../store'
var callAPI = function(endpoint, methord='GET', payload){

	var header = {}

	var apiConfig = {
		 mode: 'cors',
		 methord,
		 header
	}

	if(payload){
		header['Content-Type']: 'application/json'
	}

	return fetch(endpoint, apiConfig).then(response => {
		if (response.status >= 400)
			throw { status:response.status, data:response.json() }
		
		return response.json()

	})
};

var performJob = function(endpoint, methord='GET', payload, actions){
	
	var [ successRequest, failedRequest, success, failed ] = actions
	return callAPI(endpoint, methord, payload)
			.then(json => {
				var jobObject = Object.assign({}, json, {success, failed} ) 
				
				store.dispatch(successRequest)
				store.dispatch('ADD_JOB', jobObject)
					
			})
			.catch( data => store.dispatch(failedRequest, data))

}

export {callAPI, performJob}


