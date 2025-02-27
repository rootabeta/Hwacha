function initialize_iff() { 
	// Call getOfficers in home region
	// Call getNations on self and whitelisted/blacklisted
	// Build IFF datastructure
}

/// Parse configuration file
function parse_toml(toml_file) { 

}

/// Update inbounds list with IFF-filtered (WA?) nations
function update_inbounds() { 
	console.debug(`Fetching inbounds with ${USER_AGENT}`);
/*	let item = document.createElement("p");
	item.innerText = "foo";
	document.getElementById("inbounds").appendChild(item);
*/

	// TODO: More fixy
	get_wanations("the_brotherhood_of_malice").then((wa_nations) => { 
		console.log(wa_nations);
	});
}
