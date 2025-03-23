console.debug("Hwacha CIWS Control System Module Loaded");

function initialize_control_panel() { 
	// Create top-level control panel
	document.title = "Hwacha Control System";
	let page = document.createElement('div');
	let banner = document.createElement('h1');
	banner.innerHTML = 'Hwacha CIWS Control Panel';

	page.id = "hwacha";

	// Create a header row to store configuration options
	let header = document.createElement('div');
	let subheader = document.createElement('p'); 
	subheader.id = "subheader";
	subheader.textContent = "Awaiting Configuration"; // TODO

	// Create field to set main nation
	let main_nation = document.createElement('input');
	main_nation.id = "mainnation";
	main_nation.placeholder = "Main Nation";

	// Button to lock in main nation and arm the rest of the system
	let confirm_main = document.createElement('button');
	confirm_main.textContent = "Arm CIWS";
	confirm_main.id = "confirmmain";

	let region = document.createElement('input');
	region.id = "region";
	region.placeholder = "Region";

	// Allow user to upload Brimstone config files
	// Why reuse the Brimstone file format? Spite!
	/*
	let config_file = document.createElement('input');
	config_file.id = "configfile";
	config_file.type = "file";
	config_file.accept = ".toml";
	config_file.label = "Config File"; 

	header.appendChild(config_file);*/
	header.appendChild(region);
	header.appendChild(main_nation);
	header.appendChild(confirm_main);

	page.appendChild(header);

	// Assemble panel
	// Attach panel to page
	let center = document.createElement("center");
	let split = document.createElement("hr");

	// Create panel for tracking inbound targets
	let inbounds = document.createElement('div');
	inbounds.id = "inbounds";

	center.appendChild(banner);
	center.appendChild(subheader);
	center.appendChild(split);
	center.appendChild(page);
	center.appendChild(inbounds);
	document.body.appendChild(center);

	confirm_main.onclick = confirm_nation;
}

function confirm_nation() { 
	// If nation checks out, lock out control panel
	// If nation does not, alert user

	var user_nation = document.getElementById("mainnation").value;
	if (validate_nation(user_nation)) { 
		// Lock out arm button
		let button = document.getElementById("confirmmain");
		button.disabled = true;
		button.textContent = "CIWS ARMED";

		// Lock out main nation and config file upload
		document.getElementById("mainnation").disabled = true;
//		document.getElementById("configfile").disabled = true;

		// Normalize and lock-out region name - hacky workaround for autohoming
		let region_name = document.getElementById("region").value.toLowerCase().replace(" ","_");
		document.getElementById("region").value = region_name;
		document.getElementById("region").disabled = true;

		// Set subheader
		document.getElementById("subheader").textContent = ">>> CHANGES LOCKED OUT <<<";

		arm_system();
	} else { 
		alert("The nation you have specified does not exist.");
	}
}

function arm_system() { 
	// Get software version
	let VERSION = chrome.runtime.getManifest().version;
	// Get main nation
	USER = document.getElementById("mainnation").value;

	// Build user agent identification strings
	USER_AGENT = `Hwacha/${VERSION} (By: Volstrostia; usedBy: ${USER})`;
	// For generated_by field
	USER_URL = `Hwacha_${VERSION}_by_Volstrostia_usedBy_${USER}`; // For chrome

	console.debug(`User: ${USER}`);
	console.debug(`User Agent: ${USER_AGENT}`);
	console.debug(`User URL: ${USER_URL}`);

	console.log("Hwacha activated");

	let region = document.getElementById("region").value; // Already normalized
	console.log(`Initializing IFF for ${region}`);
	get_nations(region).then((nations) => {
		console.debug("DNK:");
		console.debug(nations);
		localStorage.setItem("hwdnk", JSON.stringify(nations));
	});

	// Spin for one second to clear API rate limit
	let start = performance.now();
	while (performance.now() <= start) {};

	// Load config file from upload and parse, with sane defaults if none specified
	// var config_file = document.getElementById("configfile").files[0];
	// config = parse_toml(config_file);
	// console.log(config);

	// Poll the API at regular intervals
	window.setInterval(update_inbounds, 650);
}
