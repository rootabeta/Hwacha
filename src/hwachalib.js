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

// Function to apply the Fisher-Yates Shuffle
function shuffle(array) {

    // Iterate over the array in reverse order
    for (let i = array.length - 1; i > 0; i--) {

        // Generate Random Index
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Use IFF system to parse and display inbound hostiles
function display_inbounds(inbounds) { 
	let radar_screen = document.getElementById("inbounds");
	// Pull original residents from browser memory
	let do_not_kill = JSON.parse(localStorage.getItem("hwdnk")) || [];

	// Clear radar screen for fresh run
	radar_screen.innerHTML = "";
	let shuffled_inbounds = shuffle(inbounds);

	for (var i=0; i<shuffled_inbounds.length; i++) { 
		// If inbound is not in original list, it is an inbound and must be treated as hostile
		// This rebuilds the target list from scratch every time update_inbounds is called
		if (!do_not_kill.includes(inbounds[i])) { 
			radar_screen.innerHTML += make_link(inbounds[i]) + "<br/>";
		}
	}
}

/// Update inbounds list with IFF-filtered (WA?) nations
/// This is the primary tracking system
function update_inbounds() { 
	let current_region = document.getElementById("region").value;
	console.debug(`Fetching inbounds with ${USER_AGENT}`);
/*	let item = document.createElement("p");
	item.innerText = "foo";
	document.getElementById("inbounds").appendChild(item);
*/

	// TODO: More fixy - allow loading a config file
	get_wanations(current_region).then((wa_nations) => { 
		display_inbounds(wa_nations);
	});
}
