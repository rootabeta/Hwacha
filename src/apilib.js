function get_nations(region) { 
	fetch(
		`https://www.nationstates.net/cgi-bin/api.cgi?script=${USER_URL}&region=${current_region}&q=nations`,
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
			nations = nations.split(",");
		}
	});
}

function get_wanations(region) { 
	var headers = {};
	fetch(
		`https://www.nationstates.net/cgi-bin/api.cgi?script=${USER_URL}&region=${current_region}&q=wanations`,
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
			wanations = wanations.split(":");
		}
	});
}

// Return true/false if nation exists
function validate_nation(nation) { 
	if (nation.length > 3) { 
		return true;
	} else { 
		return false;
	}
}
