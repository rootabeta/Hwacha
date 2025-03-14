function initialize_iff() { 
	// Call getOfficers in home region
	// Call getNations on self and whitelisted/blacklisted
	// Build IFF datastructure
}

/// Parse configuration file
function parse_toml(toml_file) { 
	var parsed_config = {
		wa_only: true,
		ignore_ros: true,
		ignore_residents: true,
		target_bogeys: true,
		pollspeed: 650,
		region_override: "",
		iff_controls: {
		whitelist_nations: [],
		whitelist_regions: [],
		blacklist_nations: [],
			blacklist_regions: []
		}
	};

	// TODO: Parse options from config.toml and update
	if (toml_file) { 
		//parsed_config = {};
	}
	return parsed_config;
}

// Helper function to convert a raw nation into a clickable, rules-compliant link with hwatcha-target designation
function make_link(nation) { 
	return `<a href="https://www.nationstates.net/nation=${nation}?hwacha-target=true&template-overall=none&generated_by=${USER_URL}">${nation}</a>`;
}

// Use IFF system to parse and display inbound hostiles
function display_inbounds(inbounds) { 
	let radar_screen = document.getElementById("inbounds");
	radar_screen.innerHTML = "";
	for (var i=0; i<inbounds.length; i++) { 
		radar_screen.innerHTML += make_link(inbounds[i]) + "<br/>";
	}
}

/// Update inbounds list with IFF-filtered (WA?) nations
/// This is the primary tracking system
function update_inbounds() { 
	console.debug(`Fetching inbounds with ${USER_AGENT}`);
/*	let item = document.createElement("p");
	item.innerText = "foo";
	document.getElementById("inbounds").appendChild(item);
*/

	// TODO: More fixy - allow loading a config file
	get_wanations("the_brotherhood_of_malice").then((wa_nations) => { 
		display_inbounds(wa_nations);
	});
}
