function get_nations(region) { 
	return fetch(
		`https://www.nationstates.net/cgi-bin/api.cgi?script=${USER_URL}&region=${region}&q=nations`,
		{
		headers: { 
			"User-Agent": USER_AGENT
		},
	}).then((response) => {
		// Used to fetch API rate limit information
		headers = response.headers;
		return response.text()
	}).then((body) => { 
		var parser = new DOMParser();

		var responseDocument = parser.parseFromString(body, "text/xml");
		var nations = responseDocument.querySelector("NATIONS").textContent;

		// Empty nations
		if (!nations) { 
			nations = [];
		} else { 
			// Split on nation names
			nations = nations.split(":");
		}
		return nations;
	});
}

function get_wanations(region) { 
	console.debug(`Web request with UA ${USER_AGENT}`);
	var headers = {};
	return fetch(
		`https://www.nationstates.net/cgi-bin/api.cgi?script=${USER_URL}&region=${region}&q=wanations`,
		{
		headers: { 
			"User-Agent": USER_AGENT
		},
	}).then((response) => {
		// Used to fetch API rate limit information
		headers = response.headers;
		return response.text()
	}).then((body) => { 
		var parser = new DOMParser();

		var responseDocument = parser.parseFromString(body, "text/xml");
		var wanations = responseDocument.querySelector("UNNATIONS").textContent;

		// Empty wanations
		if (!wanations) { 
			wanations = [];
		} else { 
			// Split on nation names
			wanations = wanations.split(",");
		}
		return wanations;
	});

}

/* TODO: "Borrow" get officers utils from Railgun caching mechanism for use with IFF */

// Return true/false if nation exists
function validate_nation(nation) { 
	if (nation.length > 3) { 
		return true;
	} else { 
		return false;
	}
}
